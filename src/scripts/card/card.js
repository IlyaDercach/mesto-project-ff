import { removeCard, removeLikeCard, setLikeCard } from '../../index'

const cardElementList = document.querySelector('.places__list')

const getTemplate = () => {
	return document
		.querySelector('#card-template')
		.content.querySelector('.card')
		.cloneNode(true)
}

export const createCard = (template, data, deleteCard, like, popup) => {
	const { name, link, likes, _id } = data
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
	cardDeleteButtonElement.style.display = 'none'
	likeCounter.textContent = likes?.length || 0
	cardLikeButtonElement.after(likeCounter)

	if (data.owner?._id === '8ac6d83e527c6ec04aac986e') {
		cardDeleteButtonElement.style.display = 'block'
		deleteCard(cardDeleteButtonElement, cardElement, _id)
	}

	like(cardLikeButtonElement, _id, likes, likeCounter)

	popup(cardImageElement, cardImageElement, cardTitleElement.textContent)

	return cardElement
}

export const initialRenderCard = (card, popup) => {
	cardElementList.append(
		createCard(getTemplate, card, deleteCard, likeCard, popup)
	)
}

export const renderNewCard = (data, popup) => {
	cardElementList.prepend(
		createCard(getTemplate, data, deleteCard, likeCard, popup)
	)
}

export const deleteCard = (deleteButton, cardElement, id) => {
	deleteButton.addEventListener('click', e => {
		if (
			e.target.classList.contains('card__delete-button') &&
			e.target === deleteButton
		) {
			removeCard(id)
		}
	})
}

export const likeCard = (likeButton, id, likes, likeCounter) => {
	likes?.forEach(like => {
		if (like._id === '8ac6d83e527c6ec04aac986e') {
			likeButton.classList.add('card__like-button_is-active')
		} else {
			likeButton.classList.remove('card__like-button_is-active')
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
				})
				e.target.classList.add('card__like-button_is-active')
			} else {
				removeLikeCard(id).then(data => {
					likeCounter.textContent = data.likes.length
				})
				e.target.classList.remove('card__like-button_is-active')
			}
		}
	})
}
