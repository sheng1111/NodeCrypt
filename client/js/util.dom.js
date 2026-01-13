// Query single DOM element
// 查詢單一 DOM 元素
export function $(selector, parent = document) {
	return parent.querySelector(selector)
}
// Query multiple DOM elements
// 查詢多個 DOM 元素
export function $$(selector, parent = document) {
	return parent.querySelectorAll(selector)
}
// Get element by ID
// 透過 ID 取得元素
export function $id(id) {
	return document.getElementById(id)
}
// Create a DOM element with attributes and content
// 建立帶屬性和內容的 DOM 元素
export function createElement(tag, attrs = {}, content = '') {
	const el = document.createElement(tag);
	Object.entries(attrs).forEach(([key, value]) => {
		if (key === 'class' || key === 'className') {
			el.className = value
		} else if (key === 'style' && typeof value === 'object') {
			Object.assign(el.style, value)
		} else if (key.startsWith('on') && typeof value === 'function') {
			el.addEventListener(key.slice(2).toLowerCase(), value)
		} else {
			el.setAttribute(key, value)
		}
	});
	if (typeof content === 'string') {
		el.innerHTML = content
	} else if (content instanceof Element) {
		el.appendChild(content)
	}
	return el
}
// Add event listener
// 新增事件監聽器
export function on(target, event, handler, options) {
	const el = typeof target === 'string' ? $(target) : target;
	if (el) el.addEventListener(event, handler, options)
}
// Remove event listener
// 移除事件監聽器
export function off(target, event, handler) {
	const el = typeof target === 'string' ? $(target) : target;
	if (el) el.removeEventListener(event, handler)
}
// Add class(es) to element
// 為元素新增類名
export function addClass(el, ...classNames) {
	el.classList.add(...classNames)
}
// Remove class(es) from element
// 移除元素的類名
export function removeClass(el, ...classNames) {
	el.classList.remove(...classNames)
}
// Toggle class on element
// 切換元素的類名
export function toggleClass(el, className, force) {
	el.classList.toggle(className, force)
}
