// Import DOM utility functions
// 匯入 DOM 工具函式
import {
	$,
	$$,
	$id,
	createElement,
	on,
	off,
	addClass,
	removeClass
} from './util.dom.js';

// Import theme utilities
// 匯入主題工具函式
import { THEMES, getCurrentTheme, applyTheme } from './util.theme.js';

// Import i18n utilities
// 匯入國際化工具函式
import { t, setLanguage, getCurrentLanguage, initI18n } from './util.i18n.js';
// Default settings
// 預設設定
const DEFAULT_SETTINGS = {
	notify: false,
	sound: false,
	theme: 'theme1'
	// 注意：我們不設定預設語言，讓系統自動偵測瀏覽器語言
	// Note: We don't set a default language, let the system auto-detect browser language
};

// Load settings from localStorage
// 從 localStorage 載入設定
function loadSettings() {
	let s = localStorage.getItem('settings');
	try {
		s = s ? JSON.parse(s) : {}
	} catch {
		s = {}
	}
	return {
		...DEFAULT_SETTINGS,
		...s
	}
}

// Save settings to localStorage
// 保存設定到 localStorage
function saveSettings(settings) {
	const {
		notify,
		sound,
		theme,
		language
	} = settings;
	localStorage.setItem('settings', JSON.stringify({
		notify,
		sound,
		theme,
		language
	}))
}

// Apply settings to the document
// 套用設定到文件
function applySettings(settings) {
	// Initialize i18n with current language setting
	// 根據目前語言設定初始化國際化
	initI18n(settings);
}

// Ask for browser notification permission
// 請求瀏覽器通知權限
function askNotificationPermission(callback) {
	if (Notification.requestPermission.length === 0) {
		Notification.requestPermission().then(callback)
	} else {
		Notification.requestPermission(callback)
	}
}

// Setup the settings panel UI
// 設定設定面板 UI
function setupSettingsPanel() {
	const settingsSidebar = $id('settings-sidebar');
	const settingsContent = $id('settings-content');
	const settingsTitle = $id('settings-title');
	if (!settingsSidebar || !settingsContent) return;

	const settings = loadSettings();
	
	// Update settings title
	// 更新設定標題
	if (settingsTitle) {
		settingsTitle.textContent = t('settings.title', 'Settings');
	}
	// Create settings content HTML
	settingsContent.innerHTML = `
		<div class="settings-section">
			<div class="settings-section-title">${t('settings.notification', 'Notification Settings')}</div>
			<div class="settings-item">
				<div class="settings-item-label">
					<div>${t('settings.desktop_notifications', 'Desktop Notifications')}</div>
				</div>
				<label class="switch">
					<input type="checkbox" id="settings-notify" ${settings.notify ? 'checked' : ''}>
					<span class="slider"></span>
				</label>
			</div>
			<div class="settings-item">
				<div class="settings-item-label">
					<div>${t('settings.sound_notifications', 'Sound Notifications')}</div>
				</div>
				<label class="switch">
					<input type="checkbox" id="settings-sound" ${settings.sound ? 'checked' : ''}>
					<span class="slider"></span>
				</label>
			</div>
		</div>
		<div class="settings-section">
			<div class="settings-section-title">${t('settings.language', 'Language Settings')}</div>
			<div class="settings-item">
				<div class="settings-item-label">
					<div>${t('settings.language_switch', 'Language')}</div>
				</div>
				<div class="language-selector">
					<select id="settings-language" class="language-select">
						<option value="en" ${settings.language === 'en' ? 'selected' : ''}>${t('settings.english', 'English')}</option>
						<option value="zh" ${settings.language === 'zh' ? 'selected' : ''}>${t('settings.chinese', 'Chinese')}</option>
					</select>
				</div>
			</div>
		</div>
		
		<div class="settings-section">
			<div class="settings-section-title">${t('settings.theme', 'Theme Settings')}</div>
			<div class="theme-selector" id="theme-selector">
				${THEMES.map(theme => `
					<div class="theme-item ${settings.theme === theme.id ? 'active' : ''}" data-theme-id="${theme.id}" style="background: ${theme.background}; background-size: cover; background-position: center;">
					</div>
				`).join('')}
			</div>
		</div>
	`;
	const notifyCheckbox = $('#settings-notify', settingsContent);
	const soundCheckbox = $('#settings-sound', settingsContent);
	const languageSelect = $('#settings-language', settingsContent);
	
	// Language select event handler
	// 語言選擇事件處理
	on(languageSelect, 'change', e => {
		const newLanguage = e.target.value;
		settings.language = newLanguage;
		
		// Set language immediately
		// 立即設定語言
		setLanguage(newLanguage);
		
		// Save settings
		// 保存設定
		saveSettings(settings);
		applySettings(settings);
		
		// Refresh the settings panel to show updated translations
		// 重新整理設定面板以顯示更新的翻譯
		setTimeout(() => {
			setupSettingsPanel();
		}, 100);
	});
	
	on(notifyCheckbox, 'change', e => {
		const checked = e.target.checked;
		if (checked) {
			if (!('Notification' in window)) {
				alert(t('notification.not_supported', 'Notifications are not supported by your browser.'));
				e.target.checked = false;
				return
			}
			askNotificationPermission(permission => {
				if (permission === 'granted') {
					settings.notify = true;
					settings.sound = false;
					if (soundCheckbox) soundCheckbox.checked = false;
					saveSettings(settings);
					applySettings(settings);
					// 防止重複通知，新增一個標誌位
					if (!settingsSidebar._notificationShown) {
						new Notification(t('notification.enabled', 'Notifications enabled'), {
							body: t('notification.alert_here', 'You will receive alerts here.')
						});
						settingsSidebar._notificationShown = true; // 設定標誌位
					}
				} else {
					settings.notify = false;
					e.target.checked = false;
					saveSettings(settings);
					applySettings(settings);
					alert(t('notification.allow_browser', 'Please allow notifications in your browser settings.'))
				}
			})
		} else {
			settings.notify = false;
			saveSettings(settings);
			applySettings(settings);
			// 重置標誌位
			if (settingsSidebar._notificationShown) {
				settingsSidebar._notificationShown = false;
			}
		}
	});
	on(soundCheckbox, 'change', e => {
		settings.sound = e.target.checked;
		if (settings.sound) {
			settings.notify = false;
			if (notifyCheckbox) notifyCheckbox.checked = false;
		}
		saveSettings(settings);
		applySettings(settings)
	});
	// Theme selection event handlers
	// 主題選擇事件處理
	const themeSelector = $('#theme-selector', settingsContent);
	if (themeSelector) {
		// Custom scrolling functionality
		// 自定義捲動功能
		let isDragging = false;
		let startX = 0;
		let scrollLeft = 0;

		// Mouse wheel scrolling (vertical -> horizontal)
		on(themeSelector, 'wheel', e => {
			e.preventDefault();
			const scrollAmount = e.deltaY * 0.5; // Adjust scroll sensitivity
			themeSelector.scrollLeft += scrollAmount;
		});
		// Mouse drag scrolling
		let dragStartTime = 0;
		let hasDragged = false;
		
		on(themeSelector, 'mousedown', e => {
			isDragging = true;
			hasDragged = false;
			dragStartTime = Date.now();
			startX = e.pageX - themeSelector.offsetLeft;
			scrollLeft = themeSelector.scrollLeft;
			themeSelector.classList.add('dragging');
			e.preventDefault(); // Prevent text selection
		});
		on(document, 'mousemove', e => {
			if (!isDragging) return;
			e.preventDefault();
			const x = e.pageX - themeSelector.offsetLeft;
			const walk = (x - startX) * 2; // Scroll speed multiplier
			const moved = Math.abs(walk);
			
			// If moved more than 5px, consider it a drag
			if (moved > 5) {
				hasDragged = true;
			}
			
			themeSelector.scrollLeft = scrollLeft - walk;
		});

		on(document, 'mouseup', () => {
			if (isDragging) {
				isDragging = false;
				themeSelector.classList.remove('dragging');
			}
		});
		// Touch support for mobile
		// 行動裝置觸控支援
		let touchStartX = 0;
		let touchScrollLeft = 0;
		let touchStartTime = 0;
		let touchHasMoved = false;

		on(themeSelector, 'touchstart', e => {
			touchStartX = e.touches[0].clientX;
			touchScrollLeft = themeSelector.scrollLeft;
			touchStartTime = Date.now();
			touchHasMoved = false;
		});

		on(themeSelector, 'touchmove', e => {
			e.preventDefault();
			const touchX = e.touches[0].clientX;
			const walk = (touchStartX - touchX) * 1.5; // Touch scroll sensitivity
			
			// If moved more than 10px, consider it a swipe
			if (Math.abs(walk) > 10) {
				touchHasMoved = true;
			}
			
			themeSelector.scrollLeft = touchScrollLeft + walk;
		});

		// Handle touch end for theme selection
		// 處理觸摸結束的主題選擇
		on(themeSelector, 'touchend', e => {
			// If user swiped, don't trigger theme selection
			// 如果使用者滑動過，不觸發主題選擇
			if (touchHasMoved) {
				touchHasMoved = false;
				return;
			}
			
			// Check if it was a quick tap
			// 檢查是否是快速點擊
			const tapDuration = Date.now() - touchStartTime;
			if (tapDuration > 300) {
				return;
			}
			
			const themeItem = e.target.closest('.theme-item');
			if (themeItem) {
				const themeId = themeItem.dataset.themeId;
				if (themeId && themeId !== settings.theme) {
					// Update active state
					$$('.theme-item', themeSelector).forEach(item => {
						item.classList.remove('active');
					});
					themeItem.classList.add('active');
					
					// Apply theme and save settings
					settings.theme = themeId;
					applyTheme(themeId);
					saveSettings(settings);
				}
			}
		});
		// Theme selection click handler
		// 主題選擇點擊處理器
		on(themeSelector, 'click', e => {
			// If user just dragged, don't trigger theme selection
			// 如果使用者剛剛拖曳過，不觸發主題選擇
			if (hasDragged) {
				hasDragged = false;
				return;
			}
			
			// Also check if it was a quick click (less than 200ms and minimal movement)
			// 同時檢查是否是快速點擊（少於 200ms 且移動很少）
			const clickDuration = Date.now() - dragStartTime;
			if (clickDuration > 200) {
				return;
			}
			
			const themeItem = e.target.closest('.theme-item');
			if (themeItem) {
				const themeId = themeItem.dataset.themeId;
				if (themeId && themeId !== settings.theme) {
					// Update active state
					$$('.theme-item', themeSelector).forEach(item => {
						item.classList.remove('active');
					});
					themeItem.classList.add('active');
					
					// Apply theme and save settings
					settings.theme = themeId;
					applyTheme(themeId);
					saveSettings(settings);
				}
			}
		});
	}
}

// Check if device is mobile
function isMobile() {
	return window.innerWidth <= 768;
}

// Open the settings panel
// 開啟設定面板
function openSettingsPanel() {
	const settingsSidebar = $id('settings-sidebar');
	const sidebar = $id('sidebar');
	const sidebarMask = $id('mobile-sidebar-mask');
	
	if (!settingsSidebar || !sidebar) return;
	
	if (isMobile()) {
		// Mobile: hide main sidebar and show settings sidebar with mask
		sidebar.classList.remove('mobile-open');
		settingsSidebar.style.display = 'flex';
		// Force reflow then add animation class
		settingsSidebar.offsetHeight;
		settingsSidebar.classList.add('mobile-open');
		if (sidebarMask) {
			sidebarMask.classList.add('active');
		}
	} else {
		// Desktop: show settings sidebar as overlay with slide animation
		settingsSidebar.style.display = 'flex';
		// Force reflow then slide in
		settingsSidebar.offsetHeight;
		settingsSidebar.classList.add('open');
		// Keep main sidebar visible - settings sidebar is an overlay
	}
	
	// Setup settings content
	setupSettingsPanel();
}

// Close the settings panel
// 關閉設定面板
function closeSettingsPanel() {
	const settingsSidebar = $id('settings-sidebar');
	const sidebarMask = $id('mobile-sidebar-mask'); // mobile-sidebar-mask is used for settings on mobile

	if (!settingsSidebar) return;

	const animationEnded = () => {
		settingsSidebar.style.display = 'none';
		settingsSidebar.removeEventListener('transitionend', animationEnded);
	};

	if (isMobile()) {
		settingsSidebar.classList.remove('mobile-open');
		if (sidebarMask) {
			sidebarMask.classList.remove('active');
		}
		// Listen for transition end to set display none
		settingsSidebar.addEventListener('transitionend', animationEnded);
		// Fallback if transitionend doesn't fire (e.g., if no transition is defined or display:none is set too early by other means)
		setTimeout(() => {
			if (!settingsSidebar.classList.contains('mobile-open')) { // check if it wasn't reopened
				settingsSidebar.style.display = 'none';
			}
		}, 350); // Slightly longer than CSS transition
	} else {
		settingsSidebar.classList.remove('open');
		// Listen for transition end to set display none
		settingsSidebar.addEventListener('transitionend', animationEnded);
		// Fallback
		setTimeout(() => {
			if (!settingsSidebar.classList.contains('open')) { // check if it wasn't reopened
				settingsSidebar.style.display = 'none';
			}
		}, 350);
	}
}

// Initialize settings on page load
// 頁面載入時初始化設定
function initSettings() {
	const settings = loadSettings();
	applySettings(settings);
	
	// Apply theme from settings
	// 從設定中套用主題
	if (settings.theme) {
		applyTheme(settings.theme);
	}
	
	// Listen for language change events to update UI
	// 監聽語言變更事件以更新 UI
	window.addEventListener('languageChange', () => {
		// Update settings title if settings panel is open
		// 如果設定面板已開啟，更新設定標題
		const settingsTitle = $id('settings-title');
		if (settingsTitle) {
			settingsTitle.textContent = t('settings.title', 'Settings');
		}
	});
}

// Maximum notification text length
// 通知文字最大長度
const MAX_NOTIFY_TEXT_LEN = 100;

// Truncate text for notifications
// 截斷通知文字
function truncateText(text) {
	return text.length > MAX_NOTIFY_TEXT_LEN ? text.slice(0, MAX_NOTIFY_TEXT_LEN) + '...' : text
}

// Play sound notification
// 播放聲音通知
function playSoundNotification() {
	try {
		const ctx = new(window.AudioContext || window.webkitAudioContext)();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.frequency.value = 1000;
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start();
		gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
		setTimeout(() => {
			osc.stop();
			ctx.close()
		}, 600)
	} catch (e) {
		console.error('Sound notification failed', e)
	}
}

// Show desktop notification
// 顯示桌面通知
function showDesktopNotification(roomName, text, msgType, sender) {
	if (!('Notification' in window) || Notification.permission !== 'granted') return;
	let body;
	const senderPrefix = sender ? `${sender}:` : '';
	if (msgType === 'image' || msgType === 'private image') {
		body = `${senderPrefix}${t('notification.image', '[image]')}`;
		if (msgType === 'private image') {
			body = `${t('notification.private', '(Private)')}${body}`
		}
	} else if (msgType === 'text' || msgType === 'private text') {
		body = `${senderPrefix}${truncateText(text)}`;
		if (msgType === 'private text') {
			body = `${t('notification.private', '(Private)')}${body}`
		}
	} else {
		body = truncateText(text)
	}
	new Notification(`#${roomName}`, {
		body
	})
}

// Notify message entry point
// 通知訊息主入口
export function notifyMessage(roomName, msgType, text, sender) {
	const settings = loadSettings();
	if (settings.notify) {
		showDesktopNotification(roomName, text, msgType, sender)
	} else if (settings.sound) {
		playSoundNotification()
	}
}
export {
	openSettingsPanel,
	closeSettingsPanel,
	initSettings
};
