import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { createCard, cardDelete, addLike } from './components/card.js'
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js'

const placeList = document.querySelector('.places__list')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const profileEditBtn = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const profileAddBtn = document.querySelector('.profile__add-button')
const closePopupButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')
const profileTitle = document.querySelector('.profile__title')
const profileDescr = document.querySelector('.profile__description')
const editForm = document.querySelector('form[name="edit-profile"]')
const editNameInput = editForm.querySelector('.popup__input_type_name')
const editJobInput = editForm.querySelector('.popup__input_type_description')
const newCardForm = document.querySelector('form[name="new-place"]')
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name')
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url')

//добавляем карточки в контейнер
for (let i = 0; i < initialCards.length; i++) {
  const cards = createCard(initialCards[i], cardDelete, openPopupImage, addLike)
  placeList.prepend(cards)
}

//функция открытия popup по клике на картинку
function openPopupImage(cardLink, cardName) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = cardLink
  popupImage.alt = cardName
  popupCaption.textContent = cardName

  openPopup(popupTypeImage)
}

//функция редактирования профиля
function editFormSubmit(e) {
  e.preventDefault()

  const nameValue = editNameInput.value
  const jobValue = editJobInput.value

  profileTitle.textContent = nameValue
  profileDescr.textContent =  jobValue

  closePopup(popupTypeEdit)
}
editForm.addEventListener('submit', editFormSubmit)

//функция добавления новой карточки
function NewCardForm(e) {
  e.preventDefault()

  const newCard = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value
  }

  const card = createCard(newCard, cardDelete, openPopupImage)
  placeList.prepend(card)
  
  newCardForm.reset()

  closePopup(popupTypeNewCard)
}
newCardForm.addEventListener('submit', NewCardForm)

//слушатель на кнопку редактирования профиля
profileEditBtn.addEventListener('click', () => {
  editNameInput.value = profileTitle.textContent
  editJobInput.value =  profileDescr.textContent
  openPopup(popupTypeEdit)
})

//слушатель на кнопку добавления новой карточки
profileAddBtn.addEventListener('click', () => openPopup(popupTypeNewCard))

//закрытие popup по крестику
closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonPopup = button.closest('.popup')
    closePopup(buttonPopup)
  })
})

//вызов функции закрытия popup по клику на overlay
closePopupOverlay(popups)

//добавление класса анимации
document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if(!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated')
    }
  })
})



