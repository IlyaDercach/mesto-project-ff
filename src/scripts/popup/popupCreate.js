import {
	animatePopup,
	closePopup,
	handleCloseKey,
	handleCloseParent,
	handleCloseTrigger,
	handleOpenTrigger,
	openPopup
} from './utilsPopup'
import { renderCard } from '../card/createCard'

const popupCreate = openTrigger => {
	const popupCreateElement = document.querySelector('.popup_type_new-card')
	const closeTrigger = popupCreateElement.querySelector('.popup__close')

	animatePopup(popupCreateElement)

	handleOpenTrigger(openTrigger, () => {
		openPopup(popupCreateElement)
	})

	popupCreateElement.addEventListener('click', e => {
		handleCloseParent(e, popupCreateElement, () => {
			closePopup(popupCreateElement)
		})
		handleCloseTrigger(e, closeTrigger, () => {
			closePopup(popupCreateElement)
		})
	})

	document.addEventListener('keydown', e => {
		handleCloseKey(e, () => {
			closePopup(popupCreateElement)
		})
	})

	const formElement = document.querySelector('form[name="new-place"]')
	const nameInput = document.querySelector('.popup__input_type_card-name')
	const linkInput = document.querySelector('.popup__input_type_url')

	function handleFormSubmit(e) {
		e.preventDefault()
		const name = nameInput.value
		const link = linkInput.value

		const data = {
			name,
			link
		}

		renderCard(data)
		formElement.reset()
		closePopup(popupCreateElement)
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

export default popupCreate
