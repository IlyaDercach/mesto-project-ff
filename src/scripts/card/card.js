import { removeCard, removeLikeCard, setLikeCard } from '../api'
import { closePopup, openPopup } from '../popup/modal'

export const getTemplate = () => {
	return document
		.querySelector('#card-template')
		.content.querySelector('.card')
		.cloneNode(true)
}

export const createCard = (
	getTemplate,
	data,
	deleteCard,
	like,
	popupImage,
	userId
) => {
	const { name, link, likes, _id, owner } = data
	const cardElement = getTemplate()
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
	cardDeleteButtonElement.style.display =
		userId === owner._id ? 'block' : 'none'
	likeCounter.textContent = likes?.length || 0
	cardLikeButtonElement.after(likeCounter)

	cardDeleteButtonElement.addEventListener('click', () => {
		deleteCard(_id, cardElement)
	})

	if (likes.some(like => like._id === userId)) {
		cardLikeButtonElement.classList.add('card__like-button_is-active')
	}

	cardLikeButtonElement.addEventListener('click', () => {
		like(cardLikeButtonElement, _id, likeCounter)
	})

	cardImageElement.addEventListener('click', () => {
		popupImage(cardImageElement, cardTitleElement.textContent)
	})

	return cardElement
}

export const deleteCard = (id, cardElement) => {
	const popupConfirm = document.querySelector('.popup_type_delete-card')
	const confirmDeleteButton = popupConfirm.querySelector('.popup__button')

	openPopup(popupConfirm)

	confirmDeleteButton.onclick = () => {
		removeCard(id)
			.then(() => {
				cardElement.remove()
				closePopup(popupConfirm)
			})
			.catch(err => console.log(err))
	}
}

export const likeCard = (likeButton, id, likeCounter) => {
	const likeMethod = likeButton.classList.contains(
		'card__like-button_is-active'
	)
		? removeLikeCard
		: setLikeCard

	likeMethod(id)
		.then(data => {
			likeCounter.textContent = data.likes.length
			likeButton.classList.toggle('card__like-button_is-active')
		})
		.catch(err => console.log(err))
}
