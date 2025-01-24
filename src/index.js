import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { initialRenderCard, renderNewCard } from './scripts/card/card'
import {
	animatePopup,
	closePopup,
	handleCloseKey,
	handleCloseOverlay,
	openPopup
} from './scripts/popup/modal'

const openPopupEditButton = document.querySelector('.profile__edit-button')
const openPopupCreateButton = document.querySelector('.profile__add-button')

const popupEditElement = document.querySelector('.popup_type_edit')
const popupCreateElement = document.querySelector('.popup_type_new-card')
const popups = document.querySelectorAll('.popup')

const popupEdit = (popup, openTrigger, form) => {
	const closeTrigger = popup.querySelector('.popup__close')

	openTrigger.addEventListener('click', () => openPopup(popup))

	closeTrigger.addEventListener('click', () => closePopup(popup))

	document.addEventListener('keydown', e =>
		handleCloseKey(e, () => closePopup(popup))
	)

	popup.addEventListener('click', e =>
		handleCloseOverlay(e, popup, () => closePopup(popup))
	)

	form()
}

const popupEditForm = () => {
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

const createPopup = (popup, openTrigger, form) => {
	const closeTrigger = popup.querySelector('.popup__close')

	openTrigger.addEventListener('click', () => openPopup(popup))
	closeTrigger.addEventListener('click', () => closePopup(popup))

	document.addEventListener('keydown', e =>
		handleCloseKey(e, () => closePopup(popup))
	)

	popup.addEventListener('click', e =>
		handleCloseOverlay(e, popup, () => closePopup(popup))
	)

	form()
}

const popupCreateForm = () => {
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

		renderNewCard(data, popupImage)
		formElement.reset()
		closePopup(popupCreateElement)
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

const popupImage = (openTrigger, image, caption) => {
	const popup = document.querySelector('.popup_type_image')
	const imagePopupElement = popup.querySelector('.popup__image')
	const captionPopupElement = popup.querySelector('.popup__caption')
	const closeTrigger = popup.querySelector('.popup__close')

	openTrigger.addEventListener('click', () => {
		openPopup(popup)
		imagePopupElement.src = image.src
		imagePopupElement.alt = caption
		captionPopupElement.textContent = caption
	})
	closeTrigger.addEventListener('click', () => closePopup(popup))

	document.addEventListener('keydown', e =>
		handleCloseKey(e, () => closePopup(popup))
	)

	popup.addEventListener('click', e =>
		handleCloseOverlay(e, popup, () => closePopup(popup))
	)
}

initialCards.forEach(card => {
	initialRenderCard(card, popupImage)
})
animatePopup(popups)
popupEdit(popupEditElement, openPopupEditButton, popupEditForm)
createPopup(popupCreateElement, openPopupCreateButton, popupCreateForm)
