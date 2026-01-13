// Use DOMPurify to safely handle HTML content
// 使用 DOMPurify 安全處理 HTML 內容
import DOMPurify from 'dompurify';

// Escape HTML special characters
// 轉義 HTML 特殊字元
export function escapeHTML(str) {
	if (typeof str !== 'string') return '';
	// 使用替換方法確保 HTML 特殊字元被轉義，而不是被移除
	// 這樣 <java> 會變成 &lt;java&gt; 而不是被刪除
	return str.replace(/[&<>"']/g, function(c) {
		return {
			'&': '&amp;',  // & 轉為 &amp;
			'<': '&lt;',   // < 轉為 &lt;
			'>': '&gt;',   // > 轉為 &gt;
			'"': '&quot;', // " 轉為 &quot;
			"'": '&#39;'   // ' 轉為 &#39;
		}[c];
	});
}

// Convert text to HTML, preserving line breaks
// 將文字轉換為 HTML，保留換行符號
export function textToHTML(text) {
	if (typeof text !== 'string') return '';
	// 先進行 HTML 轉義，然後將換行符號替換為 <br> 標籤
	// 最後使用 DOMPurify 確保結果是安全的 HTML
	const escaped = escapeHTML(text);
	const withLineBreaks = escaped.replace(/\n/g, '<br>');
	return DOMPurify.sanitize(withLineBreaks, {
		ALLOWED_TAGS: ['br'], // 只允許 <br> 標籤
		ALLOWED_ATTR: [],     // 不允許任何屬性
	});
}
