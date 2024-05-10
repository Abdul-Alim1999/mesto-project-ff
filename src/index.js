import './pages/index.css'
import {initialCards} from '../src/scripts/cards.js'
import { createCard, cardDelete, addLike } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js'

const placeList = document.querySelector('.places__list')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupEditButton = document.querySelector('.profile__edit-button')
const popupNewCard = document.querySelector('.popup_type_new-card')
const newCardForm = popupNewCard.querySelector('.popup__form')
const newCardName = popupNewCard.querySelector('.popup__input_type_card-name')
const newCardUrl = popupNewCard.querySelector('.popup__input_type_url')
const addCardButton = document.querySelector('.profile__add-button')
const closePopupButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

//добавление начальных карточек
for(let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i], cardDelete, openImagePopup, addLike)
  placeList.prepend(card)
}

//функция обработки формы редактирования
function handleFormSubmit(e) {
  e.preventDefault() 

  const nameInputValue = nameInput.value 
  const jobInputValue = jobInput.value

  const profileTitle = document.querySelector('.profile__title')
  const profileDescr = document.querySelector('.profile__description')

  profileTitle.textContent = nameInputValue
  profileDescr.textContent = jobInputValue

  closePopup(popupTypeEdit)
}
formElement.addEventListener('submit', handleFormSubmit)

////функция добавления новой карточки
function addNewCard(e) {
  e.preventDefault()

  const cardNameValue = newCardName.value 
  const cardUrlValue = newCardUrl.value

  const newCard = {
    name: cardNameValue,
    link: cardUrlValue
  }

  const card =  createCard(newCard, cardDelete)
  placeList.prepend(card)

  newCardForm.reset()

  closePopup(popupNewCard)
}
newCardForm.addEventListener('submit', addNewCard)

//функция открытия картинки по клику
function openImagePopup(cardName, cardUlr) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = cardName
  popupImage.alt = cardUlr
  popupCaption.textContent = cardUlr

  openPopup(popupTypeImage)
}

// Открытие попапа редактирования профиля
popupEditButton.addEventListener('click', () => openPopup(popupTypeEdit))

// Открытие попапа для новой карточки
addCardButton.addEventListener('click', () => openPopup(popupNewCard))

//кнопка закрытия popup
closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttons = button.closest('.popup')
    closePopup(buttons)
  })
})

// Закрытие popup по нажатию на Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popups.forEach((popup) => closePopup(popup))
  }
})

// Закрытие popup по клику за пределами popup
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'popup') {
      closePopup(popup)
    }
  })
})










