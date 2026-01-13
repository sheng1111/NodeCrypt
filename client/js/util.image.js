// Import DOM helpers
// 匯入 DOM 輔助函式
import {
	$,
	on,
	createElement
} from './util.dom.js';

// Process and compress image file
// 處理並壓縮圖片檔案
export async function processImage(file, callback) {
	// Create image element for loading file
	// 建立圖片元素用於載入檔案
	const img = new Image();
	img.onload = function() {
		const maxW = 1280, // Max width
			maxH = 1280;    // 最大高度
		let w = img.naturalWidth,
			h = img.naturalHeight;
		// Resize if too large
		// 如果圖片過大則調整大小
		if (w > maxW || h > maxH) {
			const scale = Math.min(maxW / w, maxH / h);
			w = Math.round(w * scale);
			h = Math.round(h * scale)
		}
		// Create canvas for drawing image
		// 建立畫布用於繪製圖片
		const canvas = createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, w, h);
		let dataUrl;
		// Export as webp with 90% quality
		// 匯出為 webp，90% 品質
		dataUrl = canvas.toDataURL('image/webp', 0.90);
		callback(dataUrl)
	};
	// Read file as data URL
	// 以 dataURL 方式讀取檔案
	const reader = new FileReader();
	reader.onload = function(e) {
		img.src = e.target.result
	};
	reader.readAsDataURL(file)
}

// Translate message key
// 翻譯訊息 key
function t(key) {
	const messages = {
		tooLarge: 'Image is too large (over 8MB)', // 圖片過大（超過8MB）
	};
	return messages[key] || key
}

// Create image preview element for input
// 為輸入框建立圖片預覽元素
function createImagePreview(dataUrl) {
	const preview = createElement('div', {
		class: 'input-image-preview'
	});
	
	const img = createElement('img', {
		src: dataUrl,
		class: 'input-image-preview-img'
	});
	
	const removeBtn = createElement('button', {
		class: 'input-image-remove-btn',
		type: 'button'
	}, '×');
	
	preview.appendChild(img);
	preview.appendChild(removeBtn);
	
	return { preview, removeBtn };
}

// Setup image paste functionality
// 設定圖片貼上功能
export function setupImagePaste(inputSelector) {
	const input = $(inputSelector);
	if (!input) return;

	let currentImageDatas = []; // 支援多張圖片
	const imagePreviewContainer = createElement('div', { class: 'image-preview-container' });
	input.parentNode.insertBefore(imagePreviewContainer, input);

	// Function to update placeholder visibility
	function updatePlaceholderVisibility() {
		const placeholder = input.parentNode.querySelector('.input-field-placeholder');
		if (!placeholder) return;

		const hasText = input.innerText.trim().length > 0;
		const hasImages = currentImageDatas.length > 0;

		if (hasText || hasImages) {
			placeholder.style.opacity = '0';
			input.classList.remove('is-empty'); // 確保移除 is-empty
		} else {
			placeholder.style.opacity = '1';
			input.classList.add('is-empty'); // 確保新增 is-empty
		}
	}

	// Initial check for placeholder
	updatePlaceholderVisibility();

	// Listen to input events to update placeholder
	on(input, 'input', updatePlaceholderVisibility);
	on(input, 'focus', updatePlaceholderVisibility);
	on(input, 'blur', () => {
		// Defer blur check slightly to allow click on remove button
		setTimeout(updatePlaceholderVisibility, 100);
	});

	on(input, 'paste', function(e) {
		if (!e.clipboardData) return;

		let imageProcessed = false;
		for (const item of e.clipboardData.items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (!file) continue;

				if (file.size > 8 * 1024 * 1024) {
					alert(t('tooLarge'));
					continue;
				}

				processImage(file, (dataUrl) => {
					const { preview, removeBtn } = createImagePreview(dataUrl);
					imagePreviewContainer.appendChild(preview);
					currentImageDatas.push({ dataUrl, previewElement: preview });

					on(removeBtn, 'click', () => {
						preview.remove();
						currentImageDatas = currentImageDatas.filter(img => img.dataUrl !== dataUrl);
						updatePlaceholderVisibility();
					});
					updatePlaceholderVisibility();
				});
				imageProcessed = true;
			}
		}
		if (imageProcessed) {
			e.preventDefault();
		}
	});
	return {
		getCurrentImages: () => currentImageDatas.map(img => img.dataUrl), // 返回所有圖片資料
		clearImages: () => {
			imagePreviewContainer.innerHTML = ''; // 清空預覽容器
			currentImageDatas = [];
			updatePlaceholderVisibility();
		},
		refreshPlaceholder: updatePlaceholderVisibility // 暴露 placeholder 更新函式
	};
}

// Setup legacy image send functionality (for backward compatibility)
// 設定舊版圖片傳送功能（向後相容）
export function setupImageSend({
	inputSelector,
	attachBtnSelector,
	fileInputSelector,
	onSend
}) {
	const input = $(inputSelector);
	const attachBtn = $(attachBtnSelector);
	const fileInput = $(fileInputSelector);
	
	if (fileInput) fileInput.setAttribute('accept', 'image/*');
	
	if (attachBtn && fileInput) {
		// Click attach triggers file input
		// 點擊附件按鈕觸發檔案選擇
		on(attachBtn, 'click', () => fileInput.click());
		
		// Handle file input change
		// 處理檔案選擇變化
		on(fileInput, 'change', async function() {
			if (!fileInput.files || !fileInput.files.length) return;
			const file = fileInput.files[0];
			
			// Only allow image files
			// 只允許圖片檔案
			if (!file.type.startsWith('image/')) return;
			
			// Check file size
			// 檢查檔案大小
			if (file.size > 5 * 1024 * 1024) {
				alert(t('tooLarge'));
				return
			}
			
			processImage(file, (dataUrl) => {
				if (typeof onSend === 'function') onSend(dataUrl)
			});
			fileInput.value = ''
		})
	}
	
	if (input) {
		// Paste image from clipboard
		// 從剪貼簿貼上圖片
		on(input, 'paste', function(e) {
			if (!e.clipboardData) return;
			for (const item of e.clipboardData.items) {
				// Only handle image type
				// 只處理圖片類型
				if (item.type.startsWith('image/')) {
					const file = item.getAsFile();
					if (!file) continue;
					
					// Check file size
					// 檢查檔案大小
					if (file.size > 5 * 1024 * 1024) {
						alert(t('tooLarge'));
						continue
					}
					
					processImage(file, (dataUrl) => {
						if (typeof onSend === 'function') onSend(dataUrl)
					});
					e.preventDefault();
					break
				}
			}
		})
	}
}

