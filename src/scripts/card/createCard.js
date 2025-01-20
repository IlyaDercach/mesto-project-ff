import { popupImage } from '../popup'

const cardElementList = document.querySelector('.places__list')

const createCard = (data, like, popup) => {
	const { name, link } = data
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImageElement = cardElement.querySelector('.card__image')
	const cardTitleElement = cardElement.querySelector('.card__title')
	const cardDeleteButtonElement = cardElement.querySelector(
		'.card__delete-button'
	)
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button')

	cardImageElement.src = link
	cardImageElement.alt = name
	cardTitleElement.textContent = name

	cardElementList.addEventListener('click', e => {
		if (
			e.target.classList.contains('card__delete-button') &&
			e.target === cardDeleteButtonElement
		) {
			cardElement.remove()
		}
	})

	like(cardElementList, cardLikeButtonElement)
	popup(cardElementList, cardImageElement, cardTitleElement.textContent)

	return cardElement
}

export const initialRenderCard = card => {
	cardElementList.append(createCard(card, likeCard, popupImage))
}

export const renderCard = data => {
	cardElementList.prepend(createCard(data, likeCard, popupImage))
}

const likeCard = (container, likeBtn) => {
	container.addEventListener('click', e => {
		if (
			e.target === likeBtn &&
			e.target.classList.contains('card__like-button')
		) {
			e.target.classList.toggle('card__like-button_is-active')
		}
	})
}
