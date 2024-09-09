import { deleteCardOnServer, likeCard, unlikeCard } from "./api.js"

//функция создания карточки
export const createCard = (card, openPopupImage, userId) => {
  const { name, link } = card
  
  const cardTemplate = document.querySelector('#card-template').content
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardTemplateClone.querySelector('.card__image')
  const cardTitle = cardTemplateClone.querySelector('.card__title')
  const cardDeleteButton = cardTemplateClone.querySelector('.card__delete-button')
  const cardLikeButton = cardTemplateClone.querySelector('.card__like-button')
  const cardLikeCounter = cardTemplateClone.querySelector('.card__like-counter')

  cardDeleteButton.addEventListener('click', () => cardDelete(cardTemplateClone, card._id))
  cardImage.addEventListener('click', () => openPopupImage(name, link))
  cardLikeButton.addEventListener('click', (event) => cardLike(event, card._id, cardLikeCounter))
  cardLikeCounter.textContent = card.likes.length

  cardImage.src = link
  cardImage.alt = name
  cardTitle.textContent = name

  if(card.owner._id === userId) {
    cardDeleteButton.classList.remove('card__delete-button_hidden')
  } else {
    cardDeleteButton.classList.add('card__delete-button_hidden')
  }
    
  if(card.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }

  return cardTemplateClone
}


//функция удаления карточки
const cardDelete = (card, cardId) => {
  deleteCardOnServer(cardId)
  .then(() => {
    card.remove()
  })
  .catch((error) => {
    console.log(error)
  })
}


//функция лайка карточки
const cardLike = (event, cardId, cardLikeCountainer) => {
  const likeButton = event.target

  if(likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCard(cardId)
    .then((cardData) => {
      likeButton.classList.remove('card__like-button_is-active')
      cardLikeCountainer.textContent = cardData.likes.length
    })
    .catch((error) => {
      console.log(error)
    })
  }else {
    likeCard(cardId)
    .then((cardData) => {
      likeButton.classList.add('card__like-button_is-active')
      cardLikeCountainer.textContent = cardData.likes.length
    })
    .catch((error) => {
      console.log(error)
    })
  }
}