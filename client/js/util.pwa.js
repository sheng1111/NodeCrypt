import { registerSW } from 'virtual:pwa-register';
import { t } from './util.i18n.js';

const TOAST_VISIBLE_CLASS = 'pwa-toast-visible';

export function initPwa() {
	const toast = document.getElementById('pwa-toast');
	const titleEl = document.getElementById('pwa-toast-title');
	const bodyEl = document.getElementById('pwa-toast-body');
	const actionBtn = document.getElementById('pwa-toast-action');
	const dismissBtn = document.getElementById('pwa-toast-dismiss');
	if (!toast || !titleEl || !bodyEl || !actionBtn || !dismissBtn) return;

	let activeType = null;
	let deferredPrompt = null;
	let updateSW = null;
	let dismissTimeout = null;
	let refreshing = false;

	const isStandalone = () => {
		return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
	};

	const clearAutoDismiss = () => {
		if (dismissTimeout) {
			clearTimeout(dismissTimeout);
			dismissTimeout = null;
		}
	};

	const hideToast = () => {
		clearAutoDismiss();
		toast.classList.remove(TOAST_VISIBLE_CLASS);
		activeType = null;
		actionBtn.disabled = false;
	};

	const showToast = (type) => {
		clearAutoDismiss();
		activeType = type;
		actionBtn.disabled = false;

		if (type === 'update') {
			titleEl.textContent = t('pwa.update_title', 'Update available');
			bodyEl.textContent = t('pwa.update_body', 'A new version is ready. Refresh to update.');
			actionBtn.textContent = t('pwa.update_action', 'Update now');
			dismissBtn.textContent = t('pwa.update_dismiss', 'Not now');
			actionBtn.style.display = '';
			dismissBtn.style.display = '';
		} else if (type === 'install') {
			titleEl.textContent = t('pwa.install_title', 'Install NodeCrypt');
			bodyEl.textContent = t('pwa.install_body', 'Add to your home screen for faster access and offline support.');
			actionBtn.textContent = t('pwa.install_action', 'Install');
			dismissBtn.textContent = t('pwa.update_dismiss', 'Not now');
			actionBtn.style.display = '';
			dismissBtn.style.display = '';
		} else if (type === 'offline') {
			titleEl.textContent = t('pwa.offline_title', 'Offline ready');
			bodyEl.textContent = t('pwa.offline_body', 'You can continue using the app without a network connection.');
			actionBtn.style.display = 'none';
			dismissBtn.style.display = 'none';
			dismissTimeout = setTimeout(() => hideToast(), 3500);
		}

		toast.classList.add(TOAST_VISIBLE_CLASS);
	};

	const handleAction = async () => {
		if (activeType === 'update' && updateSW) {
			actionBtn.disabled = true;
			updateSW(true);
			return;
		}
		if (activeType === 'install' && deferredPrompt) {
			actionBtn.disabled = true;
			deferredPrompt.prompt();
			try {
				await deferredPrompt.userChoice;
			} finally {
				deferredPrompt = null;
				hideToast();
			}
		}
	};

	actionBtn.addEventListener('click', handleAction);
	dismissBtn.addEventListener('click', () => {
		if (activeType === 'install') {
			sessionStorage.setItem('pwa-install-dismissed', '1');
		}
		hideToast();
	});

	window.addEventListener('languageChange', () => {
		if (activeType) showToast(activeType);
	});

	window.addEventListener('beforeinstallprompt', (event) => {
		if (isStandalone() || sessionStorage.getItem('pwa-install-dismissed')) return;
		event.preventDefault();
		deferredPrompt = event;
		showToast('install');
	});

	window.addEventListener('appinstalled', () => {
		deferredPrompt = null;
		hideToast();
	});

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (refreshing) return;
			refreshing = true;
			window.location.reload();
		});
	}

	updateSW = registerSW({
		onNeedRefresh() {
			showToast('update');
		},
		onOfflineReady() {
			showToast('offline');
		}
	});
}
