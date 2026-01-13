# Use a Node.js 18 Alpine base image for the backend builder
# 使用 Node.js 18 Alpine 基底映像作為後端建置器
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copy package.json first to leverage Docker's caching
# 先複製 package.json 以利用 Docker 的快取
COPY server/package.json ./server/
# Install production dependencies
# 安裝正式環境依賴
RUN cd server && npm install --production --no-package-lock --no-audit

# Copy only the server.js file
# 僅複製 server.js 檔案
COPY server/server.js ./server/

# Frontend build stage
# 前端建置階段
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend dependencies and configuration files
# 複製前端依賴與設定檔
COPY package.json package-lock.json* ./
# Install dependencies
# 安裝依賴
RUN npm ci --no-audit || npm install --no-audit

# Copy source code and configuration files
# 複製原始碼與設定檔
COPY vite.config.js ./
COPY client/ ./client/

# Build the frontend
# 建置前端
RUN npm run build:docker

# Second stage: Minimal image
# 第二階段：極小映像
FROM alpine:3.16

# Install minimal Node.js and Nginx
# 安裝最小化版本的 Node.js 與 Nginx
RUN apk add --no-cache nodejs nginx && \
    mkdir -p /app/server /app/client /run/nginx && \
    # Clean up apk cache
    # 清理 apk 快取
    rm -rf /var/cache/apk/*

# Copy server files and static files
# 複製伺服器檔案與靜態檔案
COPY --from=backend-builder /app/server/node_modules /app/server/node_modules
COPY --from=backend-builder /app/server/*.js /app/server/
# Copy built frontend files from the frontend build stage
# 從前端建置階段複製建置好的檔案，而不是複製 dist 目錄
COPY --from=frontend-builder /app/dist/ /app/client/

# Optimized Nginx configuration
# 最佳化的 Nginx 設定
RUN cat > /etc/nginx/nginx.conf <<'EOF'
worker_processes 1;
worker_rlimit_nofile 512;
events { 
    worker_connections 128; 
    multi_accept off;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    
    # Optimization settings
    # 最佳化設定
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 15;
    types_hash_max_size 1024;
    client_max_body_size 1M;
    client_body_buffer_size 128k;
    
    # Disable access logs to reduce I/O
    # 停用存取日誌以降低 I/O
    access_log off;
    error_log /dev/null;
    # Disable unnecessary features
    # 停用不需要的功能
    server_tokens off;
    
    # Map to handle WebSocket upgrade detection
    # 映射處理 WebSocket 升級偵測
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }

    server {
        listen 80;
        server_name localhost;
        
        # Main location block - handles both HTTP and WebSocket
        # 主位置區塊 - 處理 HTTP 與 WebSocket
        location / {
            # Check if this is a WebSocket upgrade request
            # 檢查是否為 WebSocket 升級請求
            if ($http_upgrade = "websocket") {
                proxy_pass http://127.0.0.1:8088;
                break;
            }
            
            # For WebSocket requests, proxy to Node.js backend
            # 對於 WebSocket 請求，代理到 Node.js 後端
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # For regular HTTP requests, serve static files
            # 對於一般 HTTP 請求，提供靜態檔案
            root /app/client;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
}
EOF

EXPOSE 80

# Set low memory environment variables and remove unsupported options
# 設定低記憶體環境變數，移除不支援的選項

# Run in the foreground and combine commands to reduce the number of processes
# 使用前台執行並合併命令減少行程數
CMD ["sh", "-c", "node --expose-gc --unhandled-rejections=strict /app/server/server.js & nginx -g 'daemon off;'"]
