const cardElementList = document.querySelector('.places__list')

const getTemplate = () => {
	return document
		.querySelector('#card-template')
		.content.querySelector('.card')
		.cloneNode(true)
}

export const createCard = (template, data, deleteCard, like, popup) => {
	const { name, link } = data
	const cardElement = template()
	const cardImageElement = cardElement.querySelector('.card__image')
	const cardTitleElement = cardElement.querySelector('.card__title')
	const cardDeleteButtonElement = cardElement.querySelector(
		'.card__delete-button'
	)
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button')

	cardImageElement.src = link
	cardImageElement.alt = name
	cardTitleElement.textContent = name

	deleteCard(cardDeleteButtonElement, cardElement)
	like(cardLikeButtonElement)
	// popup(cardImageElement, cardTitleElement.textContent)
	popup(cardImageElement, cardImageElement, cardTitleElement.textContent)

	return cardElement
}

// popup image
export const initialRenderCard = (card, popup) => {
	cardElementList.append(
		createCard(getTemplate, card, deleteCard, likeCard, popup)
	)
}

// popup image
export const renderNewCard = (data, popup) => {
	cardElementList.prepend(
		createCard(getTemplate, data, deleteCard, likeCard, popup)
	)
}

export const deleteCard = (deleteButton, card) => {
	deleteButton.addEventListener('click', e => {
		if (
			e.target.classList.contains('card__delete-button') &&
			e.target === deleteButton
		) {
			card.remove()
		}
	})
}

export const likeCard = likeButton => {
	likeButton.addEventListener('click', e => {
		if (
			e.target === likeButton &&
			e.target.classList.contains('card__like-button')
		) {
			e.target.classList.toggle('card__like-button_is-active')
		}
	})
}
