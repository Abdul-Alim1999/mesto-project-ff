import '../pages/index.css';
import {initialCards} from '../scripts/cards'

const cardTemplate = document.querySelector('#card-template').content
const placeList = document.querySelector('.places__list')

function createCard(card, cardDelete) {
  const cloneTemplate = cardTemplate.querySelector('.card').cloneNode(true)
  const cardButton = cloneTemplate.querySelector('.card__delete-button')

  cardButton.addEventListener('click', function(){
    cardDelete(cloneTemplate)
  })

  const cardImage = cloneTemplate.querySelector('.card__image')
  cardImage.src = card.link
  cardImage.alt = card.name

  cloneTemplate.querySelector('.card__title').textContent = card.name

  return cloneTemplate
}

function cardDelete(card) {
  card.remove()
}

for(let i = 0; i < initialCards.length; i++) {
  const addCard = createCard(initialCards[i], cardDelete)
  placeList.prepend(addCard)
}