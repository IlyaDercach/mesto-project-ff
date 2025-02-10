import './pages/index.css'
import { initialRenderCard, renderNewCard } from './scripts/card/card'
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
	fetchUser,
	setUserProfile
} from './scripts/api'

const validationOptions = {
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

// EDIT POPUP
const openPopupEdit = (popup, openTrigger) => {
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
			.finally(() => {
				isLoading(saveButtonElement, false)
				closePopup(popupEditElement)
			})
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

// CREATE POPUP
const openPopupCreate = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="new-place"]')
	const nameInput = document.querySelector('.popup__input_type_card-name')
	const linkInput = document.querySelector('.popup__input_type_url')
	const saveButtonElement = formElement.querySelector('.popup__button')

	openTrigger.addEventListener('click', () => {
		if (nameInput.value === '') {
			saveButtonElement.classList.add('button_inactive')
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

		isLoading(saveButtonElement, true)
		createNewCard(data)
			.then(dataCard => {
				renderNewCard(dataCard, openPopupImage, userId)
			})
			.finally(() => {
				isLoading(saveButtonElement, false)
				formElement.reset()
				closePopup(popupCreateElement)
				clearValidation(formElement, validationOptions)
			})
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

// AVATAR POPUP
const openPopupEditAvatar = (popup, openTrigger) => {
	const formElement = document.querySelector('form[name="new-avatar"]')
	const linkInput = formElement.querySelector('.popup__input_type_url')
	const saveButtonElement = formElement.querySelector('.popup__button')

	openTrigger.addEventListener('click', () => {
		if (linkInput.value === '') {
			saveButtonElement.classList.add('button_inactive')
		}
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
			.then(() => {
				fetchUser().then(user => {
					setUserProfile(user)
				})
			})
			.finally(() => {
				isLoading(saveButtonElement, false)
				formElement.reset()
				closePopup(popupEditAvatar)
				clearValidation(formElement, validationOptions)
			})
	}

	formElement.addEventListener('submit', handleFormSubmit)
}

const isLoading = (btn, load = false) => {
	load ? (btn.textContent = 'Сохранение...') : (btn.textContent = 'Сохранить')
}

const showErrorUploadingCards = () => {
	const errMessElement = document.createElement('span')
	errMessElement.textContent = 'Не удалось загрузить данные =('
	errMessElement.classList.add('form__input-error')
	document.querySelector('.places').append(errMessElement)
}

Promise.all([fetchUser(), fetchCards()]).then(responses => {
	responses.forEach(data => {
		if (!Array.isArray(data)) {
			setUserProfile(data)
			userId = data._id
		} else {
			if (data && userId) {
				data?.forEach(card => {
					initialRenderCard(card, openPopupImage, userId)
				})
			} else {
				showErrorUploadingCards()
			}
		}
	})
})

setClosePopupEventListeners(popups)
openPopupEdit(popupEditElement, openPopupEditButton)
openPopupCreate(popupCreateElement, openPopupCreateButton)
openPopupEditAvatar(popupEditAvatar, openPopupEditAvatarButton)

enableValidation(validationOptions)
