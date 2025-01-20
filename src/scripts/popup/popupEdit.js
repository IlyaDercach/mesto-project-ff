import {
	closePopup,
	openPopup,
	handleOpenTrigger,
	handleCloseParent,
	handleCloseTrigger,
	handleCloseKey,
	animatePopup
} from './utilsPopup'

const popupEdit = openTrigger => {
	const popupEditElement = document.querySelector('.popup_type_edit')
	const closeTrigger = popupEditElement.querySelector('.popup__close')

	animatePopup(popupEditElement)

	handleOpenTrigger(openTrigger, () => {
		openPopup(popupEditElement)
	})

	popupEditElement.addEventListener('click', e => {
		handleCloseParent(e, popupEditElement, () => {
			closePopup(popupEditElement)
		})
		handleCloseTrigger(e, closeTrigger, () => {
			closePopup(popupEditElement)
		})
	})

	document.addEventListener('keydown', e => {
		handleCloseKey(e, () => {
			closePopup(popupEditElement)
		})
	})

	const formElement = document.querySelector('form[name="edit-profile"]')
	const nameInput = document.querySelector('.popup__input_type_name')
	const jobInput = document.querySelector('.popup__input_type_description')
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')

	nameInput.value = profileNameElement.textContent
	jobInput.value = profileJobElement.textContent

	function handleFormSubmit(e) {
		e.preventDefault()
		const name = nameInput.value
		const job = jobInput.value

		profileNameElement.textContent = name
		profileJobElement.textContent = job
		closePopup(popupEditElement)
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

export default popupEdit
