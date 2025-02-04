import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { initialRenderCard, renderNewCard } from './scripts/card/card'
import {
	setClosePopupEventListeners,
	closePopup,
	openPopup
} from './scripts/popup/modal'
import { clearValidation, enableValidation } from './scripts/validation'

const validationOptions = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'button_inactive',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active'
}

const openPopupEditButton = document.querySelector('.profile__edit-button')
const openPopupCreateButton = document.querySelector('.profile__add-button')

const popupEditElement = document.querySelector('.popup_type_edit')
const popupCreateElement = document.querySelector('.popup_type_new-card')
const popups = document.querySelectorAll('.popup')

// EDIT POPUP
const openPopupEdit = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="edit-profile"]')

	const nameInput = document.querySelector('.popup__input_type_name')
	const jobInput = document.querySelector('.popup__input_type_description')

	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')

	const fillInputValueOfEditForm = () => {
		nameInput.value = profileNameElement.textContent
		jobInput.value = profileJobElement.textContent
	}

	openTrigger.addEventListener('click', () => {
		fillInputValueOfEditForm(popup)
		openPopup(popup)
		clearValidation(formElement, validationOptions)
	})

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

// CREATE POPUP
const openPopupCreate = (popup, openTrigger, form) => {
	const formElement = document.querySelector('form[name="new-place"]')
	const nameInput = document.querySelector('.popup__input_type_card-name')
	const linkInput = document.querySelector('.popup__input_type_url')

	openTrigger.addEventListener('click', () => {
		if (nameInput.value === '') {
			const btn = formElement.querySelector('.popup__button')
			btn.classList.add('button_inactive')
		}
		openPopup(popup)
	})

	function handleFormSubmit(e) {
		e.preventDefault()
		const name = nameInput.value
		const link = linkInput.value

		const data = {
			name,
			link
		}
		formElement.reset()
		renderNewCard(data, openPopupImage)
		closePopup(popupCreateElement)
		clearValidation(formElement, validationOptions)
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

// PICTURE POPUP
const openPopupImage = (openTrigger, image, caption) => {
	const popup = document.querySelector('.popup_type_image')
	const imagePopupElement = popup.querySelector('.popup__image')
	const captionPopupElement = popup.querySelector('.popup__caption')

	openTrigger.addEventListener('click', () => {
		openPopup(popup)
		imagePopupElement.src = image.src
		imagePopupElement.alt = caption
		captionPopupElement.textContent = caption
	})
}
// INITIAL
initialCards.forEach(card => {
	initialRenderCard(card, openPopupImage)
})

setClosePopupEventListeners(popups)
openPopupEdit(popupEditElement, openPopupEditButton)
openPopupCreate(popupCreateElement, openPopupCreateButton)

enableValidation(validationOptions)
