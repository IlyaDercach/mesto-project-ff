import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { initialRenderCard, renderNewCard } from './scripts/card/card'
import {
	setClosePopupEventListeners,
	closePopup,
	openPopup
} from './scripts/popup/modal'
import { clearValidation, enableValidation } from './scripts/validation'

const cardElementList = document.querySelector('.places__list')
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
		// renderNewCard(data, openPopupImage)
		createCard(data)
		// fetchCards()
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
// initialCards.forEach(card => {
// 	initialRenderCard(card, openPopupImage)
// })

setClosePopupEventListeners(popups)
openPopupEdit(popupEditElement, openPopupEditButton)
openPopupCreate(popupCreateElement, openPopupCreateButton)

enableValidation(validationOptions)

// API -------------------------------------------------------------------------------

// FETCH CARDS
const fetchCards = () => {
	fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/cards', {
		headers: {
			authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321'
		}
	})
		.then(response => response.json())
		.then(data => {
			cardElementList.innerHTML = ''
			setCards(data)
			console.log(data)
		})
}

// FETCH USER
const fetchUser = () => {
	fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/users/me', {
		headers: {
			authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321'
		}
	})
		.then(response => response.json())
		.then(data => {
			setUserProfile(data)
		})
}

// PATCH USER
const editUser = () => {
	fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/users/me', {
		method: 'PATCH',
		headers: {
			authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: 'Gojo Satory',
			about: 'Аниме шиз'
		})
	})
		.then(response => response.json())
		.then(data => {
			// setUserProfile(data)
			console.log(data)
		})
}

// CREATE CARD
export const createCard = async data => {
	try {
		const { name, link } = data
		return await fetch(
			'https://mesto.nomoreparties.co/v1/wff-cohort-31/cards',
			{
				method: 'POST',
				headers: {
					authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					link
				})
			}
		)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(data => {
				console.log(data)
				// renderNewCard(data, openPopupImage)
				fetchCards()
			})
	} catch (error) {
		throw new Error(`Request Error: ${error?.status} ${error?.message}`)
	}
}

// DELETE CARD
export const removeCard = async id => {
	try {
		return await fetch(
			`https://mesto.nomoreparties.co/v1/wff-cohort-31/cards/${id}`,
			{
				method: 'DELETE',
				headers: {
					authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321'
				}
			}
		)
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			})
			.then(() => {
				fetchCards()
			})
	} catch (error) {
		throw new Error(`Request Error: ${error?.status} ${error?.message}`)
	}
}

// SET LIKE CARD LIKE
export const setLikeCard = async id => {
	try {
		return await fetch(
			`https://mesto.nomoreparties.co/v1/wff-cohort-31/cards/likes/${id}`,
			{
				method: 'PUT',
				headers: {
					authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321'
				}
			}
		).then(res => {
			if (res.ok) {
				// console.log(res.json())
				return res.json()
			}
		})
	} catch (error) {
		throw new Error(`Request Error: ${error?.status} ${error?.message}`)
	}
}

// REMOVE LIKE CARD LIKE
export const removeLikeCard = async id => {
	try {
		return await fetch(
			`https://mesto.nomoreparties.co/v1/wff-cohort-31/cards/likes/${id}`,
			{
				method: 'DELETE',
				headers: {
					authorization: '9dfd7803-ba42-4cdf-9792-1877bab2e321'
				}
			}
		).then(res => {
			if (res.ok) {
				return res.json()
			}
		})
	} catch (error) {
		throw new Error(`Request Error: ${error?.status} ${error?.message}`)
	}
}

Promise.all([fetchCards, fetchUser]).then(results => {
	results[1]()
	results[0]()
})

const setUserProfile = user => {
	const { name, about, avatar, _id } = user
	const profileNameElement = document.querySelector('.profile__title')
	const profileJobElement = document.querySelector('.profile__description')
	const profileAvatarImageElement = document.querySelector('.profile__image')

	profileNameElement.textContent = name
	profileJobElement.textContent = about
	profileAvatarImageElement.style.backgroundImage = `url(${avatar})`
	profileAvatarImageElement.alt = _id
}

const setCards = cards => {
	// cardElementList.innerHTML = ''
	cards.forEach(card => {
		initialRenderCard(card, openPopupImage)
	})
}
