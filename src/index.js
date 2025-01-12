import './pages/index.css'
import { initialCards } from './scripts/cards.js'

console.log('test')
const cardElementList = document.querySelector('.places__list')

const selectCardItems = () => {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImageElement = cardElement.querySelector('.card__image')
	const cardTitleElement = cardElement.querySelector('.card__title')
	const cardDeleteButtonElement = cardElement.querySelector(
		'.card__delete-button'
	)

	return {
		cardElement,
		cardImageElement,
		cardTitleElement,
		cardDeleteButtonElement
	}
}

const createCard = (renderElement, removeCard, data) => {
	const { name, link } = data

	renderElement.cardImageElement.src = link
	renderElement.cardImageElement.alt = name
	renderElement.cardTitleElement.textContent = name

	renderElement.cardDeleteButtonElement.addEventListener('click', () =>
		removeCard(renderElement.cardElement)
	)

	return renderElement.cardElement
}

const removeItem = cardElement => {
	cardElement.remove()
}

initialCards.forEach(card => {
	cardElementList.append(createCard(selectCardItems(), removeItem, { ...card }))
})
