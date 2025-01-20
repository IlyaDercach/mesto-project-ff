import {
	animatePopup,
	closePopup,
	handleCloseKey,
	handleCloseParent,
	handleCloseTrigger,
	openPopup
} from './utilsPopup'

const popupImage = (container, cardImage, cardTitle) => {
	const popupImageElement = document.querySelector('.popup_type_image')
	const imagePopupElement = popupImageElement.querySelector('.popup__image')
	const popupCaptionElement = popupImageElement.querySelector('.popup__caption')
	const closeTrigger = popupImageElement.querySelector('.popup__close')

	animatePopup(popupImageElement)

	container.addEventListener('click', e => {
		if (e.target === cardImage && e.target.classList.contains('card__image')) {
			openPopup(popupImageElement)
			imagePopupElement.src = cardImage.src
			popupCaptionElement.textContent = cardTitle
		}
	})

	popupImageElement.addEventListener('click', e => {
		handleCloseParent(e, popupImageElement, () => {
			closePopup(popupImageElement)
		})
		handleCloseTrigger(e, closeTrigger, () => {
			closePopup(popupImageElement)
		})
	})

	document.addEventListener('keydown', e => {
		handleCloseKey(e, () => {
			closePopup(popupImageElement)
		})
	})
}

export default popupImage
