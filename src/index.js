import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { initialRenderCard, renderNewCard } from './scripts/card/card'
import {
	setClosePopupEventListeners,
	closePopup,
	openPopup
} from './scripts/popup/modal'

const openPopupEditButton = document.querySelector('.profile__edit-button')
const openPopupCreateButton = document.querySelector('.profile__add-button')

const popupEditElement = document.querySelector('.popup_type_edit')
const popupCreateElement = document.querySelector('.popup_type_new-card')
const popups = document.querySelectorAll('.popup')

const openPopupEdit = (popup, openTrigger, form) => {
	openTrigger.addEventListener('click', () => openPopup(popup))
	form()
}

const createPopupEditForm = () => {
	const formElement = document.querySelector('form[name="edit-profile"]')
	const nameInput = document.querySelector('.popup__input_type_name')
	const jobInput = document.querySelector('.popup__input_type_description')
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')

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

const openPopupCreate = (popup, openTrigger, form) => {
	openTrigger.addEventListener('click', () => openPopup(popup))
	form()
}

const createPopupCreateForm = () => {
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
		formElement.reset()
		renderNewCard(data, openPopupImage)
		closePopup(popupCreateElement)
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

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

initialCards.forEach(card => {
	initialRenderCard(card, openPopupImage)
})

setClosePopupEventListeners(popups)
openPopupEdit(popupEditElement, openPopupEditButton, createPopupEditForm)
openPopupCreate(
	popupCreateElement,
	openPopupCreateButton,
	createPopupCreateForm
)
