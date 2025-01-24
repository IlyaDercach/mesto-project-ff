export const animatePopup = popups => {
	popups.forEach(popup => popup.classList.add('popup_is-animated'))
}

export const openPopup = popup => {
	popup.classList.add('popup_is-opened')
}

export const closePopup = popup => {
	if (popup.classList.contains('popup_is-opened')) {
		popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', handleCloseKey)
		document.removeEventListener('click', handleCloseOverlay)
	}
}

export const handleCloseOverlay = (e, overlay, closePopup) => {
	if (e.target === overlay) {
		closePopup()
	}
}

export const handleCloseKey = (e, close) => {
	if (e.key === 'Escape') {
		close()
	}
}
