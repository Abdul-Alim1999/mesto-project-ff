import './pages/index.css'
import { createCard } from './components/card.js'
import { openPopup, closePopup, closePopupByOverlay } from './components/modal.js'
import { addNewCard, getCards, getUser, updateAvatar, updateUser } from './components/api.js'
import { enableValidation, clearValidation } from './components/validation'


//переменные
const placeList = document.querySelector('.places__list')
const popupEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupEditForm = popupTypeEdit.querySelector('.popup__form')
const popupEditNameInput = popupEditForm.querySelector('.popup__input_type_name')
const popupEditDescInput = popupEditForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description') 
const popupAddCardButton = document.querySelector('.profile__add-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const newCardForm = popupTypeNewCard.querySelector('.popup__form')
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name')
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url')
const closePopupButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')
const popupTypeAvatar = document.querySelector('.popup_type_avatar')
const popupAvatarForm = popupTypeAvatar.querySelector('.popup__form')
const avatarInput = popupAvatarForm.querySelector('.popup__input_type_url')
const profileAvatar = document.querySelector('.profile__image')
const profileOverlay = document.querySelector('.profile__overlay')


//текущий пользователь
let currentUser


//получаем пользователя и карточки
Promise.all(([getUser(), getCards()]))
.then(([user, cardsArr]) => {
  handlingUser(user)
  currentUser = user
  cardsArr.forEach(cardData => {
    placeList.append(createCard(cardData, openPopupImage, user._id))
  })
})
.catch((error) => {
  console.log(error)
})


//функция обработки данных пользователя
const handlingUser = (user) => {
  const { name, about, avatar } = user
  
  profileTitle.textContent = name
  profileDesc.textContent = about
  profileAvatar.src = avatar
}


//функция редактирования профиля
const editProfileSubmit = (e) => {
  e.preventDefault()

  const nameValue = popupEditNameInput.value
  const descValue = popupEditDescInput.value
  const formButton = popupEditForm.querySelector('.popup__button')
  const initialTextButton = formButton.textContent
  
  formButton.textContent = 'Сохранение...'
  formButton.classList.add('saving')

  updateUser(nameValue, descValue)
  .then((profileData) => {
    handlingUser(profileData)
    closePopup(popupTypeEdit)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    formButton.textContent = initialTextButton
    formButton.classList.remove('saving')
  })
}
popupEditForm.addEventListener('submit', editProfileSubmit)


//функция добавления новой карточки
const newCardFormSubmit = (e) => {
  e.preventDefault()
  
  const nameValue = newCardNameInput.value
  const urlValue = newCardUrlInput.value
  const formButton = newCardForm.querySelector('.popup__button')
  const initialTextButton = formButton.textContent
  
  formButton.textContent = 'Сохранение...'
  formButton.classList.add('saving')

  addNewCard(nameValue, urlValue)
  .then((cardData) => {
    placeList.prepend(createCard(cardData, openPopupImage, currentUser._id))
    newCardForm.reset()
    closePopup(popupTypeNewCard)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    formButton.textContent = initialTextButton
    formButton.classList.remove('saving')
  })
}
newCardForm.addEventListener('submit', newCardFormSubmit)


//функция обновления аватара пользователя
const avatarFormSubmit = (e) => {
  e.preventDefault()

  const avatarValue = avatarInput.value
  const formButton = popupAvatarForm.querySelector('.popup__button')
  const initialTextButton = formButton.textContent

  formButton.textContent = 'Сохранение...'
  formButton.classList.add('saving')

  updateAvatar(avatarValue)
  .then((avatarData) => {
    profileAvatar.src = avatarData.avatar
    closePopup(popupTypeAvatar)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    formButton.textContent = initialTextButton
    formButton.classList.remove('saving')
  })
}
popupAvatarForm.addEventListener('submit', avatarFormSubmit)


//функция открытия попапа по клике на картинку
const openPopupImage = (name, link) => {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = link
  popupImage.alt = name
  popupCaption.textContent = name

  openPopup(popupTypeImage)
}


//слушатель на кнопку редактирования профиля
popupEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit)
  clearValidation(popupEditForm, validationConfig)
  popupEditNameInput.value = profileTitle.textContent
  popupEditDescInput.value = profileDesc.textContent
})


//слушатель на кнопку добавления новой карточки
popupAddCardButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard)
  clearValidation(newCardForm, validationConfig)
})


//закрытия попапа по клику на крестик
closePopupButtons.forEach(buttons => {
  buttons.addEventListener('click', () => {
    const popup = buttons.closest('.popup')
    closePopup(popup)
  })
})


//добавление анимации для попапов
document.addEventListener('DOMContentLoaded', () => {
  popups.forEach(popup => {
    if(!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated')
    }
  })
})


//слушатель на замену аватара пользователя
profileOverlay.addEventListener('click', () => openPopup(popupTypeAvatar))


//вызов функции открытия попапа по клику на Overlay
closePopupByOverlay(popups)


// Включение валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


enableValidation(validationConfig);