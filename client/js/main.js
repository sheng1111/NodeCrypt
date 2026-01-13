// 匯入 NodeCrypt 模組（加密功能模組）
// Import the NodeCrypt module (used for encryption)
import './NodeCrypt.js';

// 從 util.file.js 中匯入設定檔案傳送的函式
// Import setupFileSend function from util.file.js
import {
	setupFileSend,
	handleFileMessage,
	downloadFile
} from './util.file.js';

// 從 util.image.js 中匯入圖片處理功能
// Import image processing functions from util.image.js
import {
	setupImagePaste
} from './util.image.js';

// 從 util.emoji.js 中匯入設定表情選擇器的函式
// Import setupEmojiPicker function from util.emoji.js
import {
	setupEmojiPicker
} from './util.emoji.js';

// 從 util.settings.js 中匯入設定面板的功能函式
// Import functions for settings panel from util.settings.js
import {
	openSettingsPanel,   // 開啟設定面板 / Open settings panel
	closeSettingsPanel,  // 關閉設定面板 / Close settings panel
	initSettings,         // 初始化設定 / Initialize settings
	notifyMessage         // 通知訊息提示 / Display notification message
} from './util.settings.js';
import { t, updateStaticTexts } from './util.i18n.js';

// 從 util.theme.js 中匯入主題功能函式
// Import theme functions from util.theme.js
import {
	initTheme            // 初始化主題 / Initialize theme
} from './util.theme.js';
import { initPwa } from './util.pwa.js';

// 從 util.dom.js 中匯入常用 DOM 操作函式
// Import common DOM manipulation functions from util.dom.js
import {
	$,         // 簡化的 document.querySelector / Simplified selector
	$id,       // document.getElementById 的簡寫 / Shortcut for getElementById
	removeClass // 移除類名 / Remove a CSS class
} from './util.dom.js';

// 從 room.js 中匯入房間管理相關變數和函式
// Import room-related variables and functions from room.js
import {
	roomsData,         // 目前所有房間的資料 / Data of all rooms
	activeRoomIndex,   // 目前啟用的房間索引 / Index of the active room
	joinRoom           // 加入房間的函式 / Function to join a room
} from './room.js';

// 從 chat.js 中匯入聊天功能相關的函式
// Import chat-related functions from chat.js
import {
	addMsg,               // 新增普通訊息到聊天視窗 / Add a normal message to chat
	addOtherMsg,          // 新增其他使用者訊息 / Add message from other users
	addSystemMsg,         // 新增系統訊息 / Add a system message
	setupImagePreview,    // 設定圖片預覽功能 / Setup image preview
	setupInputPlaceholder, // 設定輸入框的佔位提示 / Setup placeholder for input box
	autoGrowInput         // 自動調整輸入框高度 / Auto adjust input height
} from './chat.js';

// 從 ui.js 中匯入 UI 介面相關的功能
// Import user interface functions from ui.js
import {	renderUserList,       // 渲染使用者清單 / Render user list
	renderMainHeader,     // 渲染主標題欄 / Render main header
	setupMoreBtnMenu,     // 設定更多按鈕的下拉選單 / Setup "more" button menu
	preventSpaceInput,    // 防止輸入空格 / Prevent space input in form fields
	loginFormHandler,     // 登入表單提交處理器 / Login form handler
	openLoginModal,       // 開啟登入視窗 / Open login modal
	showActionModal,      // 顯示動作提示視窗 / Show action modal
	setupTabs,            // 設定頁面標籤切換 / Setup tab switching
	autofillRoomPwd,      // 自動填入房間密碼 / Autofill room password
	generateLoginForm,    // 生成登入表單HTML / Generate login form HTML
	initLoginForm,        // 初始化登入表單 / Initialize login form
	initFlipCard          // 初始化翻轉卡片功能 / Initialize flip card functionality
} from './ui.js';

// 設定全域配置參數
// Set global configuration parameters
window.config = {
	wsAddress: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`, // WebSocket 伺服器位址 / WebSocket server address
	//wsAddress: `wss://crypt.works`,
	debug: true                       // 是否開啟除錯模式 / Enable debug mode
};

// 在頁面開始載入前就初始化語言設定，防止閃爍
// Initialize language settings before document starts loading
initSettings();
updateStaticTexts();

// 把一些函式掛載到 window 物件上供其他模組使用
// Expose functions to the global window object for accessibility
window.addSystemMsg = addSystemMsg;
window.addOtherMsg = addOtherMsg;
window.joinRoom = joinRoom;
window.notifyMessage = notifyMessage;
window.setupEmojiPicker = setupEmojiPicker;
window.handleFileMessage = handleFileMessage;
window.downloadFile = downloadFile;
window.showActionModal = showActionModal;

// 當 DOM 內容載入完成後執行初始化邏輯
// Run initialization logic when the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
	// 移除預載樣式類，允許過渡效果
	// Remove preload class to allow transitions
	setTimeout(() => {
		document.body.classList.remove('preload');
	}, 300);

	const footerYear = $id('footer-year');
	if (footerYear) {
		footerYear.textContent = String(new Date().getFullYear());
	}
	
	// 初始化登入表單 / Initialize login form
	initLoginForm();

	const loginForm = $id('login-form');               // 登入表單 / Login form

	if (loginForm) {
		// 監聽登入表單提交事件 / Listen to login form submission
		loginForm.addEventListener('submit', loginFormHandler(null))
	}

	const joinBtn = $('.join-room'); // 加入房間按鈕 / Join room button
	if (joinBtn) {
		joinBtn.onclick = openLoginModal; // 點擊開啟登入視窗 / Click to open login modal
	}
	// 阻止使用者輸入使用者名稱、房間名和密碼時輸入空格
	// Prevent space input for username, room name, and password fields
	preventSpaceInput($id('userName'));
	preventSpaceInput($id('roomName'));
	preventSpaceInput($id('password'));
	
	// 初始化翻轉卡片功能 / Initialize flip card functionality
	initFlipCard();
	
	// 初始化輔助功能和介面設定
	// Initialize autofill, input placeholders, and menus
	autofillRoomPwd();	setupInputPlaceholder();
	setupMoreBtnMenu();
	setupImagePreview();	setupEmojiPicker();
	// 由於我們已在 DOM 載入前預先初始化語言設定，這裡不需要重複初始化
	// initSettings();
	// updateStaticTexts(); // 在初始化設定後更新靜態文字 / Update static texts after initializing settings
	initTheme(); // 初始化主題 / Initialize theme
	initPwa();

	const isStandalone = () => {
		return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
	};
	let lastBackgroundNotice = 0;
	let lastForegroundNotice = 0;
	let lastReconnectPrompt = 0;

	const requestReconnect = () => {
		const rd = roomsData[activeRoomIndex];
		if (!rd || !rd.chat) return;
		const chat = rd.chat;
		if (chat && typeof chat.isOpen === 'function' && chat.isOpen()) return;
		if (typeof chat.connect === 'function') {
			chat.connect();
		}
	};
	window.requestReconnect = requestReconnect;

	document.addEventListener('visibilitychange', () => {
		if (!isStandalone()) return;
		if (activeRoomIndex < 0 || !roomsData[activeRoomIndex]) return;

		const now = Date.now();
		if (document.hidden) {
			if (now - lastBackgroundNotice > 30000) {
				addSystemMsg(t('system.pwa_background_notice', 'PWA 在背景可能暫停連線，回到前景會自動重新連線。'));
				lastBackgroundNotice = now;
			}
			return;
		}

		if (now - lastForegroundNotice <= 30000) return;
		const rd = roomsData[activeRoomIndex];
		const chat = rd && rd.chat;
		if (chat && typeof chat.isOpen === 'function' && !chat.isOpen()) {
			addSystemMsg(t('system.pwa_foreground_reconnect', '已回到前景，正在重新連線。'));
			if (now - lastReconnectPrompt > 30000 && typeof window.showActionModal === 'function') {
				window.showActionModal({
					title: t('modal.pwa_reconnect_title', '連線已暫停'),
					body: t('modal.pwa_reconnect_body', 'PWA 在背景可能中斷連線，建議重新連線。'),
					actionText: t('action.reconnect', '重新連線'),
					cancelText: t('action.dismiss', '稍後'),
					onAction: requestReconnect
				});
				lastReconnectPrompt = now;
			}
		} else {
			addSystemMsg(t('system.pwa_foreground_notice', '已回到前景。'));
		}
		lastForegroundNotice = now;
	});
	
	const settingsBtn = $id('settings-btn'); // 設定按鈕 / Settings button
	if (settingsBtn) {
		settingsBtn.onclick = (e) => {
			e.stopPropagation();  // 阻止事件冒泡 / Stop event from bubbling
			openSettingsPanel(); // 開啟設定面板 / Open settings panel
		}
	}

	// 設定返回按鈕事件處理 / Settings back button event handler
	const settingsBackBtn = $id('settings-back-btn');
	if (settingsBackBtn) {
		settingsBackBtn.onclick = (e) => {
			e.stopPropagation();
			closeSettingsPanel(); // 關閉設定面板 / Close settings panel
		}
	}
	// 點擊其他地方時關閉設定面板 (已移除，因為現在使用側邊欄形式)
	// Close settings panel when clicking outside (removed since we now use sidebar format)
	const input = document.querySelector('.input-message-input'); // 訊息輸入框 / Message input box
	
	// 設定圖片貼上功能
	// Setup image paste functionality
	const imagePasteHandler = setupImagePaste('.input-message-input');
	
	if (input) {
		input.focus(); // 自動聚焦 / Auto focus
		input.addEventListener('keydown', (e) => {
			// 按下 Enter 鍵並且不按 Shift，表示傳送訊息
			// Pressing Enter (without Shift) sends the message
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				sendMessage();
			}
		});
	}
	
	// 傳送訊息的統一函式
	// Unified function to send messages
	function sendMessage() {
		const text = input.innerText.trim(); // 取得輸入的文字 / Get input text
		const images = imagePasteHandler ? imagePasteHandler.getCurrentImages() : []; // 取得所有圖片

		if (!text && images.length === 0) return; // 如果沒有文字且沒有圖片，则不傳送
		const rd = roomsData[activeRoomIndex]; // 目前房間資料 / Current room data
		
		if (rd && rd.chat) {
			if (images.length > 0) {
				// 傳送包含圖片的訊息 (支援多圖和文字合併)
				// Send message with images (supports multiple images and text combined)
				const messageContent = {
					text: text || '', // 包含文字內容，如果有的话
					images: images    // 包含所有圖片資料
				};

				if (rd.privateChatTargetId) {
					// 私訊圖片訊息加密並傳送
					// Encrypt and send private image message
					const targetClient = rd.chat.channel[rd.privateChatTargetId];
					if (targetClient && targetClient.shared) {
						const clientMessagePayload = {
							a: 'm',
							t: 'image_private',
							d: messageContent
						};
						const encryptedClientMessage = rd.chat.encryptClientMessage(clientMessagePayload, targetClient.shared);
						const serverRelayPayload = {
							a: 'c',
							p: encryptedClientMessage,
							c: rd.privateChatTargetId
						};
						const encryptedMessageForServer = rd.chat.encryptServerMessage(serverRelayPayload, rd.chat.serverShared);						rd.chat.sendMessage(encryptedMessageForServer);
						addMsg(messageContent, false, 'image_private');
					} else {
						addSystemMsg(`${t('system.private_message_failed', 'Cannot send private message to')} ${rd.privateChatTargetName}. ${t('system.user_not_connected', 'User might not be fully connected.')}`)
					}
				} else {
					// 公開頻道圖片訊息傳送
					// Send image message to public channel
					rd.chat.sendChannelMessage('image', messageContent);
					addMsg(messageContent, false, 'image');
				}
				
				imagePasteHandler.clearImages(); // 清除所有圖片預覽
			} else if (text) {
				// 傳送純文字訊息
				// Send text-only message
				if (rd.privateChatTargetId) {
					// 私訊訊息加密並傳送
					// Encrypt and send private message
					const targetClient = rd.chat.channel[rd.privateChatTargetId];
					if (targetClient && targetClient.shared) {
						const clientMessagePayload = {
							a: 'm',
							t: 'text_private',
							d: text
						};
						const encryptedClientMessage = rd.chat.encryptClientMessage(clientMessagePayload, targetClient.shared);
						const serverRelayPayload = {
							a: 'c',
							p: encryptedClientMessage,
							c: rd.privateChatTargetId
						};
						const encryptedMessageForServer = rd.chat.encryptServerMessage(serverRelayPayload, rd.chat.serverShared);
						rd.chat.sendMessage(encryptedMessageForServer);					addMsg(text, false, 'text_private');
					} else {
						addSystemMsg(`${t('system.private_message_failed', 'Cannot send private message to')} ${rd.privateChatTargetName}. ${t('system.user_not_connected', 'User might not be fully connected.')}`)
					}
				} else {
					// 公開頻道訊息傳送
					// Send public message
					rd.chat.sendChannelMessage('text', text);
					addMsg(text);				}
			}
			
			// 清空輸入框並觸發 input 事件
			// Clear input and trigger input event
			input.innerHTML = ''; // 清空輸入框內容 / Clear input field content
			if (imagePasteHandler && typeof imagePasteHandler.refreshPlaceholder === 'function') {
				imagePasteHandler.refreshPlaceholder(); // 更新 placeholder 狀態
			}
			autoGrowInput(); // 調整輸入框高度
		}
	}
	
	// 為傳送按鈕新增點擊事件
	// Add click event for send button
	const sendButton = document.querySelector('.send-message-btn');
	if (sendButton) {
		sendButton.addEventListener('click', sendMessage);
	}
	
	// 設定傳送檔案功能
	// Setup file sending functionality
	setupFileSend({
		inputSelector: '.input-message-input', // 訊息輸入框選擇器 / Message input selector
		attachBtnSelector: '.chat-attach-btn', // 附件按鈕選擇器 / Attach button selector
		fileInputSelector: '.new-message-wrapper input[type="file"]', // 檔案輸入框選擇器 / File input selector
		onSend: (message) => {
			const rd = roomsData[activeRoomIndex];
			if (rd && rd.chat) {
				const userName = rd.myUserName || '';
				const msgWithUser = { ...message, userName };
				if (msgWithUser.type === 'image') {
					const imageData = msgWithUser.data || { text: '', images: [] };
					if (rd.privateChatTargetId) {
						const targetClient = rd.chat.channel[rd.privateChatTargetId];
						if (targetClient && targetClient.shared) {
							const clientMessagePayload = {
								a: 'm',
								t: 'image_private',
								d: imageData
							};
							const encryptedClientMessage = rd.chat.encryptClientMessage(clientMessagePayload, targetClient.shared);
							const serverRelayPayload = {
								a: 'c',
								p: encryptedClientMessage,
								c: rd.privateChatTargetId
							};
							const encryptedMessageForServer = rd.chat.encryptServerMessage(serverRelayPayload, rd.chat.serverShared);
							rd.chat.sendMessage(encryptedMessageForServer);
							addMsg(imageData, false, 'image_private');
						} else {
							addSystemMsg(`${t('system.private_message_failed', 'Cannot send private message to')} ${rd.privateChatTargetName}. ${t('system.user_not_connected', 'User might not be fully connected.')}`)
						}
					} else {
						rd.chat.sendChannelMessage('image', imageData);
						addMsg(imageData, false, 'image');
					}
					return;
				}
				if (rd.privateChatTargetId) {
					// 私訊檔案加密並傳送
					// Encrypt and send private file message
					const targetClient = rd.chat.channel[rd.privateChatTargetId];
					if (targetClient && targetClient.shared) {
						const clientMessagePayload = {
							a: 'm',
							t: msgWithUser.type + '_private',
							d: msgWithUser
						};
						const encryptedClientMessage = rd.chat.encryptClientMessage(clientMessagePayload, targetClient.shared);
						const serverRelayPayload = {
							a: 'c',
							p: encryptedClientMessage,
							c: rd.privateChatTargetId
						};
						const encryptedMessageForServer = rd.chat.encryptServerMessage(serverRelayPayload, rd.chat.serverShared);
						rd.chat.sendMessage(encryptedMessageForServer);
						
						// 新增到自己的聊天紀錄
						if (msgWithUser.type === 'file_start') {
							addMsg(msgWithUser, false, 'file_private');
						}					} else {
						addSystemMsg(`${t('system.private_file_failed', 'Cannot send private file to')} ${rd.privateChatTargetName}. ${t('system.user_not_connected', 'User might not be fully connected.')}`)
					}
				} else {
					// 公開頻道檔案傳送
					// Send file to public channel
					rd.chat.sendChannelMessage(msgWithUser.type, msgWithUser);
					
					// 新增到自己的聊天紀錄
					if (msgWithUser.type === 'file_start') {
						addMsg(msgWithUser, false, 'file');
					}
				}
			}		}
	});


	// 判斷是否為行動裝置
	// Check if the device is mobile
	const isMobile = () => window.innerWidth <= 768;

	// 渲染主介面元素
	// Render main UI elements
	renderMainHeader();
	renderUserList();
	setupTabs();

	const roomList = $id('room-list');
	const sidebar = $id('sidebar');
	const rightbar = $id('rightbar');
	const sidebarMask = $id('mobile-sidebar-mask');
	const rightbarMask = $id('mobile-rightbar-mask');

	// 在行動裝置點擊房間清單後關閉側邊欄
	// On mobile, clicking room list closes sidebar
	if (roomList) {
		roomList.addEventListener('click', () => {
			if (isMobile()) {
				sidebar?.classList.remove('mobile-open');
				sidebarMask?.classList.remove('active');
			}
		});
	}

	// 在行動裝置點擊成員標籤後關閉右側欄
	// On mobile, clicking member tabs closes right panel
	const memberTabs = $id('member-tabs');
	if (memberTabs) {
		memberTabs.addEventListener('click', () => {
			if (isMobile()) {
				removeClass(rightbar, 'mobile-open');
				removeClass(rightbarMask, 'active');
			}
		});
	}
});

// Listen for language change events
// 監聽語言切換事件
window.addEventListener('languageChange', (event) => {
	updateStaticTexts();
});

// 全域拖曳檔案自動開啟附件功能
// Global drag file to auto trigger attach button
let dragCounter = 0;
let hasTriggeredAttach = false;

// 監聽檔案上傳對話框關閉事件，重置拖曳標誌位
window.addEventListener('fileUploadModalClosed', () => {
	hasTriggeredAttach = false;
});

document.addEventListener('dragenter', (e) => {
	dragCounter++;
	if (!hasTriggeredAttach && e.dataTransfer.items.length > 0) {
		// 檢查是否有檔案
		for (let item of e.dataTransfer.items) {
			if (item.kind === 'file') {
				// 自動點擊附件按鈕
				const attachBtn = document.querySelector('.chat-attach-btn');
				if (attachBtn) {
					attachBtn.click();
					hasTriggeredAttach = true;
				}
				break;
			}
		}
	}
});

document.addEventListener('dragleave', (e) => {
	dragCounter--;
	if (dragCounter === 0) {
		hasTriggeredAttach = false;
	}
});

document.addEventListener('dragover', (e) => {
	e.preventDefault();
});

document.addEventListener('drop', (e) => {
	e.preventDefault();
	dragCounter = 0;
	hasTriggeredAttach = false;
});
