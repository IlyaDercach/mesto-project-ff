import './pages/index.css'
import {
	createCard,
	deleteCard,
	getTemplate,
	likeCard
} from './scripts/card/card'
import {
	closePopup,
	openPopup,
	setClosePopupEventListeners
} from './scripts/popup/modal'
import { clearValidation, enableValidation } from './scripts/validation'
import {
	createNewCard,
	editProfileAvatar,
	editUser,
	fetchCards,
	fetchUser
} from './scripts/api'

export const validationOptions = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'button_inactive',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active'
}
let userId = ''

const openPopupEditButton = document.querySelector('.profile__edit-button')
const openPopupCreateButton = document.querySelector('.profile__add-button')
const openPopupEditAvatarButton = document.querySelector('.profile__image')

const popupEditElement = document.querySelector('.popup_type_edit')
const popupCreateElement = document.querySelector('.popup_type_new-card')
const popupEditAvatar = document.querySelector('.popup_type_new-avatar')
const popups = document.querySelectorAll('.popup')
const cardElementList = document.querySelector('.places__list')

// EDIT POPUP
const setupPopupEdit = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="edit-profile"]')
	const nameInput = document.querySelector('.popup__input_type_name')
	const jobInput = document.querySelector('.popup__input_type_description')
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')
	const saveButtonElement = formElement.querySelector('.popup__button')

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
		const about = jobInput.value
		const data = { name, about }

		isLoading(saveButtonElement, true)
		editUser(data)
			.then(user => {
				setUserProfile(user)
			})
			.catch(err => console.log(err))
			.finally(() => {
				isLoading(saveButtonElement, false)
				closePopup(popupEditElement)
			})
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

// CREATE POPUP
const setupPopupCreate = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="new-place"]')
	const nameInput = document.querySelector('.popup__input_type_card-name')
	const linkInput = document.querySelector('.popup__input_type_url')
	const saveButtonElement = formElement.querySelector('.popup__button')

	openTrigger.addEventListener('click', () => {
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

		isLoading(saveButtonElement, true)
		createNewCard(data)
			.then(dataCard => {
				renderNewCard(dataCard, setupPopupImage, userId)
			})
			.catch(err => console.log(err))
			.finally(() => {
				clearValidation(formElement, validationOptions)
				isLoading(saveButtonElement, false)
				formElement.reset()
				closePopup(popupCreateElement)
			})
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

// PICTURE POPUP
const setupPopupImage = (image, caption) => {
	const popup = document.querySelector('.popup_type_image')
	const imagePopupElement = popup.querySelector('.popup__image')
	const captionPopupElement = popup.querySelector('.popup__caption')

	openPopup(popup)
	imagePopupElement.src = image.src
	imagePopupElement.alt = caption
	captionPopupElement.textContent = caption
}

// AVATAR POPUP
const setupPopupEditAvatar = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="new-avatar"]')
	const linkInput = formElement.querySelector('.popup__input_type_url')
	const saveButtonElement = formElement.querySelector('.popup__button')

	openTrigger.addEventListener('click', () => {
		openPopup(popup)
	})

	function handleFormSubmit(e) {
		e.preventDefault()
		const link = linkInput.value

		const data = {
			link
		}

		isLoading(saveButtonElement, true)
		editProfileAvatar(data.link)
			.then(user => {
				setUserProfile(user)
			})
			.catch(err => console.log(err))
			.finally(() => {
				clearValidation(formElement, validationOptions)
				isLoading(saveButtonElement, false)
				formElement.reset()
				closePopup(popupEditAvatar)
			})
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

export const initialRenderCard = (card, popupImage, userId) => {
	cardElementList.append(
		createCard(getTemplate, card, deleteCard, likeCard, popupImage, userId)
	)
}

export const renderNewCard = (card, popupImage, userId) => {
	cardElementList.prepend(
		createCard(getTemplate, card, deleteCard, likeCard, popupImage, userId)
	)
}

const isLoading = (btn, load = false) => {
	btn.textContent = load ? 'Сохранение...' : 'Сохранить'
}

const showErrorUploadingCards = () => {
	const errMessElement = document.createElement('span')
	errMessElement.textContent = 'Не удалось загрузить данные =('
	errMessElement.classList.add('form__input-error')
	document.querySelector('.places').append(errMessElement)
}

export const setUserProfile = user => {
	const { name, about, avatar } = user
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')
	const profileAvatarImageElement = document.querySelector('.profile__image')

	profileNameElement.textContent = name
	profileJobElement.textContent = about
	profileAvatarImageElement.style.backgroundImage = `url(${avatar})`
	profileAvatarImageElement.alt = `${about} ${name}`
}

Promise.all([fetchUser(), fetchCards()]).then(([user, cards]) => {
	setUserProfile(user)
	userId = user._id

	if (cards && userId) {
		cards?.forEach(card => {
			initialRenderCard(card, setupPopupImage, userId)
		})
	} else {
		showErrorUploadingCards()
	}
})

enableValidation(validationOptions)
setClosePopupEventListeners(popups)
setupPopupEdit(popupEditElement, openPopupEditButton)
setupPopupCreate(popupCreateElement, openPopupCreateButton)
setupPopupEditAvatar(popupEditAvatar, openPopupEditAvatarButton)
