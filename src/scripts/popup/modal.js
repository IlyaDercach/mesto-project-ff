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
	fillInputValueOfEditForm(popup)
	popup.classList.add('popup_is-opened')
	document.addEventListener('keydown', e =>
		handleCloseKey(e, () => closePopup(popup))
	)
}

export const closePopup = popup => {
	if (popup.classList.contains('popup_is-opened')) {
		popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', handleCloseKey)
		popup.removeEventListener('click', handleCloseOverlay)
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

const fillInputValueOfEditForm = popup => {
	const nameInput = popup.querySelector('.popup__input_type_name')
	const jobInput = popup.querySelector('.popup__input_type_description')
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')

	if (nameInput && jobInput && profileNameElement && profileJobElement) {
		nameInput.value = profileNameElement.textContent
		jobInput.value = profileJobElement.textContent
	}
}
