export const animatePopup = popup => {
	popup.classList.add('popup_is-animated')
}

export const openPopup = popup => {
	popup.classList.add('popup_is-opened')
}

export const closePopup = popup => {
	if (popup.classList.contains('popup_is-opened')) {
		popup.classList.remove('popup_is-opened')
	}
}

export const handleOpenTrigger = (openTrigger, openPopup) => {
	return isArray(openTrigger)
		? openTrigger.forEach(elem => {
				elem.addEventListener('click', e => {
					if (elem === e.target) {
						openPopup()
					}
				})
			})
		: openTrigger.addEventListener('click', () => {
				openPopup()
			})
}

const isArray = arr => {
	return Array.isArray(arr)
}

export const handleCloseParent = (e, parent, closePopup) => {
	if (e.target === parent) {
		closePopup()
	}
}

export const handleCloseTrigger = (e, closeTrigger, closePopup) => {
	if (
		e.target === closeTrigger &&
		closeTrigger.classList.contains('popup__close')
	) {
		closePopup()
	}
}

export const handleCloseKey = (e, closePopup) => {
	if (e.key === 'Escape') {
		closePopup()
		document.removeEventListener('keydown', handleCloseKey)
	}
}
