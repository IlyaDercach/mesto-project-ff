import { removeCard, removeLikeCard, setLikeCard, updateCards } from '../api'
import { closePopup, openPopup } from '../popup/modal'

const cardElementList = document.querySelector('.places__list')

const getTemplate = () => {
	return document
		.querySelector('#card-template')
		.content.querySelector('.card')
		.cloneNode(true)
}

export const createCard = (
	template,
	data,
	deleteCard,
	like,
	popupImage,
	userId
) => {
	const { name, link, likes, _id, owner } = data
	const cardElement = template()
	const cardImageElement = cardElement.querySelector('.card__image')
	const cardTitleElement = cardElement.querySelector('.card__title')
	const cardDeleteButtonElement = cardElement.querySelector(
		'.card__delete-button'
	)
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button')
	const likeCounter = document.createElement('div')

	cardImageElement.src = link
	cardImageElement.alt = name
	cardTitleElement.textContent = name
	userId === owner._id
		? (cardDeleteButtonElement.style.display = 'block')
		: (cardDeleteButtonElement.style.display = 'none')
	likeCounter.textContent = likes?.length || 0
	cardLikeButtonElement.after(likeCounter)

	deleteCard(cardDeleteButtonElement, _id, userId, popupImage, cardElement)

	like(cardLikeButtonElement, _id, likes, likeCounter, userId)

	popupImage(cardImageElement, cardImageElement, cardTitleElement.textContent)

	return cardElement
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

export const deleteCard = (
	deleteButton,
	id,
	userId,
	popupImage,
	cardElement
) => {
	const popupConfirm = document.querySelector('.popup_type_delete-card')
	const confirmDeleteButton = popupConfirm.querySelector('.popup__button')
	let cardID = ''
	let isConfirmed = false

	deleteButton.addEventListener('click', e => {
		if (e.target === deleteButton) {
			cardID = id
			openPopup(popupConfirm)
		}
	})

	const closeConfirmPopup = () => {
		isConfirmed = true
		if (cardID === id && isConfirmed) {
			removeCard(id)
				.then(data => {
					cardElement.remove()
				})
				.finally(() => {
					updateCards(popupImage, userId)
				})
			closePopup(popupConfirm)
			isConfirmed = false
			confirmDeleteButton.removeEventListener('click', closeConfirmPopup)
		}
	}
	confirmDeleteButton.addEventListener('click', closeConfirmPopup)
}

export const likeCard = (likeButton, id, likes, likeCounter, userId) => {
	likes.forEach(like => {
		if (like._id === userId) {
			likeButton.classList.add('card__like-button_is-active')
		}
	})

	likeButton.addEventListener('click', e => {
		if (
			e.target === likeButton &&
			e.target.classList.contains('card__like-button')
		) {
			if (!e.target.classList.contains('card__like-button_is-active')) {
				setLikeCard(id).then(data => {
					likeCounter.textContent = data.likes.length
					e.target.classList.add('card__like-button_is-active')
				})
			} else {
				removeLikeCard(id).then(data => {
					likeCounter.textContent = data.likes.length
					e.target.classList.remove('card__like-button_is-active')
				})
			}
		}
	})
}
