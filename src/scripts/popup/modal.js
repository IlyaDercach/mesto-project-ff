export const setClosePopupEventListeners = popups => {
	popups.forEach(popup => {
		popup.classList.add('popup_is-animated')
		const buttonClose = popup.querySelector('.popup__close')
		buttonClose.addEventListener('click', () => closePopup(popup))
		popup.addEventListener('click', e =>
			handleCloseOverlay(e, popup, () => closePopup(popup))
		)
	})
}

export const openPopup = popup => {
	popup.classList.add('popup_is-opened')
	document.addEventListener('keydown', handleCloseKey)
}

export const closePopup = popup => {
	if (popup.classList.contains('popup_is-opened')) {
		popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', handleCloseKey)
	}
}

export const handleCloseOverlay = (e, overlay, closePopup) => {
	if (e.target === overlay) {
		closePopup()
	}
}

export const handleCloseKey = e => {
	const popup = document.querySelector('.popup_is-opened')
	if (e.key === 'Escape') {
		closePopup(popup)
	}
}
