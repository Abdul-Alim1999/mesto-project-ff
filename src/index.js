import './pages/index.css'
import {initialCards} from '../src/scripts/cards.js'
import { createCard, cardDelete, addLike } from './components/card.js'
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js'

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
const editProfileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescr = document.querySelector('.profile__description')

//добавление начальных карточек
for(let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i], cardDelete, openImagePopup, addLike)
  placeList.prepend(card)
}

//функция обработки формы редактирования
function editFormSubmit(e) {
  e.preventDefault() 

  const nameInputValue = nameInput.value 
  const jobInputValue = jobInput.value

  profileTitle.textContent = nameInputValue
  profileDescr.textContent = jobInputValue

  closePopup(popupTypeEdit)
}
editProfileForm.addEventListener('submit', editFormSubmit)

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
popupEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescr.textContent
  openPopup(popupTypeEdit)
})


// Открытие попапа для новой карточки
addCardButton.addEventListener('click', () => openPopup(popupNewCard))

//кнопка закрытия popup
closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonPopup = button.closest('.popup')
    closePopup(buttonPopup)
  })
})

closePopupOverlay(popups)