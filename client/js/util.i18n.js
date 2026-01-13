// Simple i18n utility for NodeCrypt
// NodeCrypt 簡易國際化工具

// Language definitions
// 語言定義
const LANGUAGES = {
	en: {
		code: 'en',
		name: 'English',
		flag: '🇺🇸',
		translations: {
			// Meta tags for SEO
			'meta.description': 'NodeCrypt - True end-to-end encrypted chat system, no database, all messages encrypted locally, server only relays encrypted data, supports Cloudflare Workers, Docker, self-hosting and local development.',
			'meta.keywords': 'end-to-end encryption, security, chat, WebSocket, Cloudflare Workers, JavaScript, E2EE, anonymous communication, AES, ECDH, RSA, ChaCha20, security, open source, NodeCrypt, shuaiplus',
			'meta.og_title': 'NodeCrypt - End-to-End Encrypted Chat System',
			'meta.og_description': 'NodeCrypt is a zero-knowledge, end-to-end encrypted open source chat system where all encryption and decryption is done locally on the client side, and servers cannot access plaintext. Supports multi-platform deployment, secure, anonymous, no message history.',
			'meta.twitter_title': 'NodeCrypt - End-to-End Encrypted Chat System',
			'meta.twitter_description': 'NodeCrypt is a zero-knowledge, end-to-end encrypted open source chat system where all encryption and decryption is done locally on the client side, and servers cannot access plaintext.',
			
			// Login and main UI
			'ui.enter_node': 'Enter a Node',
			'ui.username': 'Username',
			'ui.node_name': 'Node Name',
			'ui.node_password': 'Node Password',
			'ui.optional': '(optional)',
			'ui.enter': 'ENTER',
			'ui.connecting': 'Connecting...',
			'ui.node_exists': 'Node already exists',
			'ui.my_name': 'My Name',
			'ui.members': 'Members',
			'ui.message': 'Message',
			'ui.private_message_to': 'Private Message to',
			'ui.me': ' (me)',
			'ui.anonymous': 'Anonymous',
			'ui.start_private_chat': 'Select for private chat',
			
			// Settings panel
			'settings.title': 'Settings',
			'settings.notification': 'Notification Settings',
			'settings.theme': 'Theme Settings',
			'settings.language': 'Language Settings',
			'settings.desktop_notifications': 'Desktop Notifications',
			'settings.sound_notifications': 'Sound Notifications',
			'settings.language_switch': 'Language',
			'settings.chinese': 'Chinese',
			'settings.english': 'English',
			
			// File upload and transfer
			'file.selected_files': 'Selected Files',
			'file.clear_all': 'Clear All',
			'file.cancel': 'Cancel',
			'file.send_files': 'Send Files',
			'file.sending': 'Sending',
			'file.receiving': 'Receiving',
			'file.files': 'files',
			'file.total': 'Total',
			'file.files_selected': '{count} files selected, {size} total',
			'file.upload_files': 'Upload Files',
			'file.attach_file': 'Attach file',
			'file.no_password_required': 'No password required',
			'file.drag_drop': 'Drag and drop files here',
			'file.or': 'or',
			'file.browse_files': 'browse files',
			
			// Notifications and messages
			'notification.enabled': 'Notifications enabled',
			'notification.alert_here': 'You will receive alerts here.',
			'notification.not_supported': 'Notifications are not supported by your browser.',
			'notification.allow_browser': 'Please allow notifications in your browser settings.',
			'notification.image': '[image]',
			'notification.private': '(Private)',
			
			// PWA
			'pwa.update_title': 'Update available',
			'pwa.update_body': 'A new version is ready. Refresh to update.',
			'pwa.update_action': 'Update now',
			'pwa.update_dismiss': 'Not now',
			'pwa.install_title': 'Install NodeCrypt',
			'pwa.install_body': 'Add to your home screen for faster access and offline support.',
			'pwa.install_action': 'Install',
			'pwa.offline_title': 'Offline ready',
			'pwa.offline_body': 'You can continue using the app without a network connection.',
			
			// Actions and menu
			'action.share': 'Share',
			'action.exit': 'Exit',
			'action.emoji': 'Emoji',
			'action.settings': 'Settings',
			'action.back': 'Back',
			'action.copied': 'Copied to clipboard!',
			'action.share_copied': 'Share link copied!',
			'action.copy_failed': 'Copy failed, text:',
			'action.copy_url_failed': 'Copy failed, url:',
			'action.nothing_to_copy': 'Nothing to copy',
			'action.copy_not_supported': 'Copy not supported in this environment',
			'action.action_failed': 'Action failed. Please try again.',
			'action.cannot_share': 'Cannot share:',
			
			// System messages
			'system.security_warning': '⚠️ This link uses an old format. Room data is not encrypted.',
			'system.file_send_failed': 'Failed to send files:',
			'system.joined': 'joined the conversation',
			'system.left': 'left the conversation',
			'system.secured': 'connection secured',
			'system.private_message_failed': 'Cannot send private message to',
			'system.private_file_failed': 'Cannot send private file to',
			'system.user_not_connected': 'User might not be fully connected.',
			
			// Help page
			'help.title': 'User Guide',
			'help.back_to_login': 'Back to Login',
			'help.usage_guide': 'User Guide',
			'help.what_is_nodecrypt': '🔐 What is NodeCrypt?',
			'help.what_is_nodecrypt_desc': 'NodeCrypt is a true zero-knowledge end-to-end encrypted chat system. With a database-free architecture, all messages are encrypted locally on your device, and the server serves only as an encrypted data relay station, unable to access any of your plaintext content.',
			'help.how_to_start': '🚀 Quick Start',
			'help.step_username': 'Enter Username',
			'help.step_username_desc': 'Choose a display name for the room, can be any name you like',
			'help.step_node_name': 'Set Node Name',
			'help.step_node_name_desc': 'Unique identifier for the room, equivalent to room number',
			'help.step_password': 'Set Node Password',
			'help.step_password_desc': 'Used to distinguish different rooms while participating in encryption process to enhance security',
			'help.step_join': 'Click "Join Room"',
			'help.step_join_desc': 'System will automatically generate encryption keys and start secure chatting',
			'help.security_features': '🔑 Security Features',
			'help.e2e_encryption': '🛡️ End-to-End Encryption',
			'help.e2e_encryption_desc': 'Uses AES-256 + ECDH encryption algorithm, messages can only be decrypted by you and the recipient',
			'help.password_enhanced_encryption': '🔐 Password Enhanced Encryption',
			'help.password_enhanced_encryption_desc': 'Node password directly participates in encryption key generation, providing additional security protection layer',
			'help.no_history': '🚫 Zero History Records',
			'help.no_history_desc': 'All messages exist only in current session, offline users cannot get historical messages',
			'help.anonymous_communication': '🎭 Complete Anonymity',
			'help.anonymous_communication_desc': 'No account registration required, no personal information collected',
			'help.decentralized': '🌐 Decentralized',
			'help.decentralized_desc': 'Supports self-hosted deployment, server does not participate in encryption/decryption process',
			'help.usage_tips': '💡 Usage Tips',
			'help.important_note': '⚠️ Important Note',
			'help.room_isolation_note': 'Same node name but different passwords are two completely independent rooms that cannot communicate with each other.',
			'help.tip_private_chat': 'Private Chat',
			'help.tip_private_chat_desc': 'Use complex node names and passwords, share only with specific people',
			'help.tip_group_chat': 'Group Chat',
			'help.tip_group_chat_desc': 'Use simple and memorable node names and passwords for easy multi-user joining',
			'help.tip_security_reminder': 'Security Reminder',
			'help.tip_security_reminder_desc': 'Both node name and password must be exactly the same to enter the same room',
			'help.tip_password_strategy': 'Password Strategy',
			'help.tip_password_strategy_desc': 'Recommend using strong passwords containing letters, numbers and symbols',
		}
	},
	zh: {
		code: 'zh',
		name: '繁體中文',
		flag: '🇹🇼',
		translations: {
			// Meta tags for SEO
			'meta.description': 'NodeCrypt - 真正的端對端加密聊天系統，無資料庫，所有訊息本地加密，伺服器僅作為加密資料中繼，支援 Cloudflare Workers、Docker、自託管與本地開發。',
			'meta.keywords': '端對端加密, 安全, 聊天, WebSocket, Cloudflare Workers, JavaScript, E2EE, 匿名通訊, AES, ECDH, RSA, ChaCha20, 安全, 開源, NodeCrypt, shuaiplus',
			'meta.og_title': 'NodeCrypt - 端對端加密聊天系統',
			'meta.og_description': 'NodeCrypt 是一個端對端加密的開源聊天系統，所有加密解密均在用戶端本地完成，伺服器無法取得明文。支援多平台部署，安全、匿名、無歷史訊息。',
			'meta.twitter_title': 'NodeCrypt - 端對端加密聊天系統',
			'meta.twitter_description': 'NodeCrypt 是一個端對端加密的開源聊天系統，所有加密解密均在用戶端本地完成，伺服器無法取得明文。',
			
			// Login and main UI
			'ui.enter_node': '進入新的節點',
			'ui.username': '使用者名稱',
			'ui.node_name': '節點名稱',
			'ui.node_password': '節點密碼',
			'ui.optional': '（可選）',
			'ui.enter': '確定',
			'ui.connecting': '連線中...',
			'ui.node_exists': '此節點已存在',
			'ui.my_name': '我的名稱',
			'ui.members': '線上成員',
			'ui.message': '訊息',
			'ui.private_message_to': '私訊給',
			'ui.me': '（我）',
			'ui.anonymous': '匿名使用者',
			'ui.start_private_chat': '選擇使用者開始私訊',
			
			// Settings panel
			'settings.title': '設定',
			'settings.notification': '通知設定',
			'settings.theme': '主題設定',
			'settings.language': '語言設定',
			'settings.desktop_notifications': '桌面通知',
			'settings.sound_notifications': '聲音通知',
			'settings.language_switch': '語言',
			'settings.chinese': '繁體中文',
			'settings.english': 'English',
			
			// File upload and transfer
			'file.selected_files': '已選擇的檔案',
			'file.clear_all': '清空全部',
			'file.cancel': '取消',
			'file.send_files': '傳送檔案',
			'file.sending': '傳送中',
			'file.receiving': '接收中',
			'file.files': '個檔案',
			'file.total': '總計',
			'file.files_selected': '已選 {count} 個檔案，總計 {size}',
			'file.upload_files': '上傳檔案',
			'file.attach_file': '附加檔案',
			'file.no_password_required': '不需密碼',
			'file.drag_drop': '拖曳檔案到此處',
			'file.or': '或',
			'file.browse_files': '瀏覽檔案',
			
			// Notifications and messages
			'notification.enabled': '通知已啟用',
			'notification.alert_here': '您會在此收到通知。',
			'notification.not_supported': '您的瀏覽器不支援通知功能。',
			'notification.allow_browser': '請在瀏覽器設定中允許通知。',
			'notification.image': '[圖片]',
			'notification.private': '（私訊）',
			
			// PWA
			'pwa.update_title': '已有新版本',
			'pwa.update_body': '新版本已準備就緒，重新整理即可更新。',
			'pwa.update_action': '立即更新',
			'pwa.update_dismiss': '稍後',
			'pwa.install_title': '安裝 NodeCrypt',
			'pwa.install_body': '加入主畫面，開啟更快並支援離線。',
			'pwa.install_action': '安裝',
			'pwa.offline_title': '已支援離線模式',
			'pwa.offline_body': '您可以在沒有網路連線時繼續使用應用程式。',
			
			// Actions and menu
			'action.share': '分享',
			'action.exit': '退出',
			'action.emoji': '表情',
			'action.settings': '設定',
			'action.back': '返回',
			'action.copied': '已複製到剪貼簿！',
			'action.share_copied': '分享連結已複製！',
			'action.copy_failed': '複製失敗，文字：',
			'action.copy_url_failed': '複製失敗，連結：',
			'action.nothing_to_copy': '沒有內容可複製',
			'action.copy_not_supported': '此環境不支援複製功能',
			'action.action_failed': '操作失敗，請重試。',
			'action.cannot_share': '無法分享：',
			
			// System messages
			'system.security_warning': '⚠️ 此連結使用舊格式，房間資料未加密。',
			'system.file_send_failed': '檔案傳送失敗：',
			'system.joined': '加入了對話',
			'system.left': '離開了對話',
			'system.secured': '已建立點對點安全連線',
			'system.private_message_failed': '無法傳送私訊給',
			'system.private_file_failed': '無法傳送私密檔案給',
			'system.user_not_connected': '使用者可能未完全連線。',
			
			// Help page
			'help.title': '使用說明',
			'help.back_to_login': '返回登入',
			'help.usage_guide': '使用說明',
			'help.what_is_nodecrypt': '🔐 什麼是 NodeCrypt？',
			'help.what_is_nodecrypt_desc': 'NodeCrypt 是一個真正的端對端加密聊天系統。採用無資料庫架構，所有訊息在您的裝置上本地加密，伺服器僅作為加密資料的中繼站，無法取得您的任何明文內容。',
			'help.how_to_start': '🚀 快速開始',
			'help.step_username': '輸入使用者名稱',
			'help.step_username_desc': '選擇一個在房間中顯示的暱稱，可以是任何您喜歡的名稱',
			'help.step_node_name': '設定節點名稱',
			'help.step_node_name_desc': '房間的唯一識別碼，相當於房號',
			'help.step_password': '設定節點密碼',
			'help.step_password_desc': '用於區分不同房間，同時參與加密流程，提升安全性',
			'help.step_join': '點擊「加入房間」',
			'help.step_join_desc': '系統將自動生成加密金鑰，開始安全聊天',
			'help.security_features': '🔑 安全特性',
			'help.e2e_encryption': '🛡️ 端對端加密',
			'help.e2e_encryption_desc': '使用 AES-256 + ECDH 加密演演算法，訊息只有您和接收者可解密',
			'help.password_enhanced_encryption': '🔐 密碼增強加密',
			'help.password_enhanced_encryption_desc': '節點密碼直接參與加密金鑰生成，提供額外的安全保護層',
			'help.no_history': '🚫 零歷史紀錄',
			'help.no_history_desc': '所有訊息僅存在於目前會話，離線使用者無法取得歷史訊息',
			'help.anonymous_communication': '🎭 完全匿名',
			'help.anonymous_communication_desc': '無需註冊帳號，不收集任何個人資訊',
			'help.decentralized': '🌐 去中心化',
			'help.decentralized_desc': '支援自託管部署，伺服器不參與加密解密流程',
			'help.usage_tips': '💡 使用技巧',
			'help.important_note': '⚠️ 重要提示',
			'help.room_isolation_note': '相同節點名稱但不同密碼的是兩個完全獨立的房間，無法相互通訊。',
			'help.tip_private_chat': '私人聊天',
			'help.tip_private_chat_desc': '使用複雜的節點名稱和密碼，只分享給特定人員',
			'help.tip_group_chat': '群聊',
			'help.tip_group_chat_desc': '使用簡單易記的節點名稱和密碼，方便多人加入',
			'help.tip_security_reminder': '安全提醒',
			'help.tip_security_reminder_desc': '節點名稱和密碼都需要完全一致才能進入同一個房間',
			'help.tip_password_strategy': '密碼策略',
			'help.tip_password_strategy_desc': '建議使用包含字母、數字和符號的強密碼',
		}
	}
};

// Current language
// 目前語言
let currentLanguage = 'en';

// Get translation for a key
// 取得翻譯文字
export function t(key, fallback = key) {
	const lang = LANGUAGES[currentLanguage];
	if (lang && lang.translations && lang.translations[key]) {
		return lang.translations[key];
	}
	return fallback;
}

// Set current language
// 設定目前語言
export function setLanguage(langCode) {
	if (LANGUAGES[langCode]) {
		currentLanguage = langCode;
		// Update document language attribute
		// 更新檔案語言屬性
		const htmlLang = langCode === 'zh' ? 'zh-TW' : langCode;
		document.documentElement.lang = htmlLang;
		
		// Update static HTML texts
		// 更新 HTML 中的靜態文字
		updateStaticTexts();
		
		// Dispatch language change event for other components to listen
		// 派發語言變更事件供其他元件監聽
		window.dispatchEvent(new CustomEvent('languageChange', {
			detail: { language: langCode }
		}));
	}
}

// Get current language
// 取得目前語言
export function getCurrentLanguage() {
	return currentLanguage;
}

// Get all available languages
// 取得所有可用語言
export function getAvailableLanguages() {
	return Object.keys(LANGUAGES).map(code => ({
		code,
		name: LANGUAGES[code].name,
		flag: LANGUAGES[code].flag
	}));
}

// Initialize i18n with settings
// 根據設定初始化國際化
export function initI18n(settings) {
	if (settings && settings.language) {
		setLanguage(settings.language);
	} else {
		// Auto-detect browser language
		// 自動偵測瀏覽器語言
		const browserLang = detectBrowserLanguage();
		setLanguage(browserLang);
	}
}

// Detect browser language and return supported language code
// 偵測瀏覽器語言並回傳支援的語言代碼
function detectBrowserLanguage() {
	const navigatorLang = navigator.language || navigator.userLanguage || 'en';
	
	// Extract language code (e.g., 'zh-CN' -> 'zh', 'en-US' -> 'en')
	const langCode = navigatorLang.split('-')[0].toLowerCase();
	
	// Check if we support this language
	if (LANGUAGES[langCode]) {
		return langCode;
	}
	
	// Default fallback to English
	return 'en';
}

// Update static HTML text elements
// 更新 HTML 中的靜態文字元素
export function updateStaticTexts() {
	// 如果 DOM 還沒準備好，等待 DOM 準備好再更新
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => updateStaticTexts());
		return;
	}
	
	// Update login title
	const loginTitle = document.getElementById('login-title');
	if (loginTitle) {
		loginTitle.textContent = t('ui.enter_node', 'Enter a Node');
	}
	
	// Update login form content with new translations
	const loginFormContainer = document.getElementById('login-form');
	if (loginFormContainer) {
		// Use a custom event to trigger form regeneration instead of dynamic import
		// 使用自訂事件觸發表單重新生成，而不是動態匯入
		window.dispatchEvent(new CustomEvent('regenerateLoginForm'));
	}
	
	// Update sidebar username label
	const sidebarUsername = document.getElementById('sidebar-username');
	if (sidebarUsername) {
		// Use a custom event to update sidebar username instead of dynamic import
		// 使用自訂事件更新側邊欄使用者名稱，而不是動態匯入
		window.dispatchEvent(new CustomEvent('updateSidebarUsername'));
	}
	
	// Update "Enter a Node" text in sidebar
	const joinRoomText = document.getElementById('join-room-text');
	if (joinRoomText) {
		joinRoomText.textContent = t('ui.enter_node', 'Enter a Node');
	}
	
	// Update Members title in rightbar
	const membersTitle = document.getElementById('members-title');
	if (membersTitle) {
		membersTitle.textContent = t('ui.members', 'Members');
	}
	
	// Update settings title
	const settingsTitle = document.getElementById('settings-title');
	if (settingsTitle) {
		settingsTitle.textContent = t('settings.title', 'Settings');
	}
	
	// Update message placeholder
	const messagePlaceholder = document.querySelector('.input-field-placeholder');
	if (messagePlaceholder) {
		messagePlaceholder.textContent = t('ui.message', 'Message');
	}
	
	// Update attach button title
	const attachBtn = document.querySelector('.chat-attach-btn');
	if (attachBtn) {
		attachBtn.title = t('file.attach_file', 'Attach file');
	}
	
	// Update emoji button title
	const emojiBtn = document.querySelector('.chat-emoji-btn');
	if (emojiBtn) {
		emojiBtn.title = t('action.emoji', 'Emoji');
	}
	
	// Update settings button title
	const settingsBtn = document.getElementById('settings-btn');
	if (settingsBtn) {
		settingsBtn.title = t('action.settings', 'Settings');
		settingsBtn.setAttribute('aria-label', t('action.settings', 'Settings'));
	}
	
	// Update back button title
	const backBtn = document.getElementById('settings-back-btn');
	if (backBtn) {
		backBtn.title = t('action.back', 'Back');
		backBtn.setAttribute('aria-label', t('action.back', 'Back'));
	}
	
	// Update all elements with data-i18n attribute
	// 更新所有具有 data-i18n 屬性的元素
	const i18nElements = document.querySelectorAll('[data-i18n]');
	i18nElements.forEach(element => {
		const key = element.getAttribute('data-i18n');
		if (key) {
			element.textContent = t(key, element.textContent || key);
		}
	});
	
	// Update all elements with data-i18n-title attribute
	// 更新所有具有 data-i18n-title 屬性的元素
	const i18nTitleElements = document.querySelectorAll('[data-i18n-title]');
	i18nTitleElements.forEach(element => {
		const key = element.getAttribute('data-i18n-title');
		if (key) {
			element.title = t(key, element.title || key);
		}
	});
	
	// Update meta tags
	// 更新 meta 標籤
	updateMetaTags();
}

// Update meta tags with current language
// 使用目前語言更新 meta 標籤
function updateMetaTags() {
	// Update description meta tag
	const metaDescription = document.querySelector('meta[name="description"]');
	if (metaDescription) {
		metaDescription.content = t('meta.description', metaDescription.content);
	}
	
	// Update keywords meta tag
	const metaKeywords = document.querySelector('meta[name="keywords"]');
	if (metaKeywords) {
		metaKeywords.content = t('meta.keywords', metaKeywords.content);
	}
	
	// Update og:title meta tag
	const metaOgTitle = document.querySelector('meta[property="og:title"]');
	if (metaOgTitle) {
		metaOgTitle.content = t('meta.og_title', metaOgTitle.content);
	}
	
	// Update og:description meta tag
	const metaOgDescription = document.querySelector('meta[property="og:description"]');
	if (metaOgDescription) {
		metaOgDescription.content = t('meta.og_description', metaOgDescription.content);
	}
	
	// Update twitter:title meta tag
	const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
	if (metaTwitterTitle) {
		metaTwitterTitle.content = t('meta.twitter_title', metaTwitterTitle.content);
	}
	
	// Update twitter:description meta tag
	const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
	if (metaTwitterDescription) {
		metaTwitterDescription.content = t('meta.twitter_description', metaTwitterDescription.content);
	}
}
