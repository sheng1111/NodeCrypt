# Repository Guidelines

## Project Structure & Module Organization
- `client/` holds the browser app: `index.html`, `css/`, `js/`, and `assets/`.
- `worker/` contains the Cloudflare Workers entry (`index.js`) and helpers (`utils.js`).
- `server/` is an optional Node WebSocket server (`server.js`) with its own `package.json`.
- Root config includes `vite.config.js`, `wrangler.toml`, and `Dockerfile` for build and deploy.

## Build, Test, and Development Commands
- `npm install`: install root dependencies.
- `npm run dev`: start Cloudflare Workers dev server via Wrangler.
- `npm run build`: build the client bundle with Vite.
- `npm run deploy`: deploy the worker to Cloudflare.
- `npm run publish`: publish via Wrangler (alternative to deploy).
- `npm run build:docker`: build assets for the Docker image.
- `cd server && npm install && node server.js`: run the standalone WebSocket server.

## Coding Style & Naming Conventions
- Indentation uses tabs in `client/js/*` and worker code; keep it consistent.
- ES module syntax is standard across client and worker (`import`/`export`).
- Utility modules follow `util.*.js` naming in `client/js/` (e.g., `util.emoji.js`).
- No formatter or linter is configured; avoid introducing new tooling without discussion.
- 全專案中文文字與註解一律使用繁體中文（臺灣用語），不得混用簡體。
- 用語偏好：伺服器、用戶端、訊息、設定、檔案、上傳/下載、連結、瀏覽器、節點、房間。

## UI/UX Notes
- 視覺風格可參考 LINE 的清爽、圓角與親和感。
- 色彩禁止使用漸層（`linear-gradient`/`radial-gradient` 等），改用純色、陰影或圖案。

## Testing Guidelines
- No automated test framework is present.
- Validate changes by running `npm run dev` and exercising chat flows in the browser.
- If you add tests, document how to run them in this file.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative summaries and may be English or Chinese; there is no enforced format.
- Keep commits scoped to a single change when possible.
- PRs should include a brief description, testing steps, and screenshots for UI changes.
- Link related issues if available.

## Security & Configuration Tips
- Do not log secrets, room passwords, or decrypted payloads.
- Update `wrangler.toml` for Cloudflare settings and keep credentials out of the repo.
- For Docker use, expose HTTPS in front of the container as noted in the README.
