import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { initialRenderCard } from './scripts/card/createCard'
import { popupEdit, popupCreate } from './scripts/popup'

initialCards.forEach(card => {
	initialRenderCard(card)
})

const openPopupEditButton = document.querySelector('.profile__edit-button')
const openPopupCreateButton = document.querySelector('.profile__add-button')

popupEdit(openPopupEditButton)
popupCreate(openPopupCreateButton)
