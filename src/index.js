import './pages/index.css';
import { createCard, cardDelete, addLike } from './components/card.js';
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUser, getCards, updateUser, createCardOnServer } from './components/api.js';

const placeList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const editForm = document.querySelector('form[name="edit-profile"]');
const editNameInput = editForm.querySelector('.popup__input_type_name');
const editJobInput = editForm.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url');

// Обновляем данные пользователя и загружаем карточки при загрузке страницы
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    handleUserInfo(user);
    cards.forEach((cardData) => {
      const card = createCard(cardData, cardDelete, openPopupImage, addLike);
      placeList.prepend(card);
    });
  })
  .catch(err => {
    console.log(err);
  });

// Функция открытия popup по клику на картинку
function openPopupImage(cardLink, cardName) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupCaption.textContent = cardName;

  openPopup(popupTypeImage);
}

const handleUserInfo = (user) => {
  const { name, about, avatar } = user;

  profileTitle.textContent = name;
  profileDescr.textContent = about;
  profileAvatar.src = avatar;
}

// Функция редактирования профиля
function editFormSubmit(e) {
  e.preventDefault();

  const newName = editNameInput.value;
  const newAbout = editJobInput.value;

  updateUser(newName, newAbout)
    .then((updatedUser) => {
      handleUserInfo(updatedUser);
      closePopup(popupTypeEdit);
    })
    .catch(err => {
      console.log(err);
    });
}
editForm.addEventListener('submit', editFormSubmit);

// Функция добавления новой карточки
function newCardFormSubmit(e) {
  e.preventDefault();

  const newCardName = newCardNameInput.value;
  const newCardLink = newCardUrlInput.value;

  createCardOnServer(newCardName, newCardLink)
    .then((cardData) => {
      const card = createCard(cardData, cardDelete, openPopupImage, addLike);
      placeList.prepend(card);
      newCardForm.reset();
      closePopup(popupTypeNewCard);
    })
    .catch(err => {
      console.log(err);
    });
}
newCardForm.addEventListener('submit', newCardFormSubmit);

// Слушатель на кнопку редактирования профиля
profileEditBtn.addEventListener('click', () => {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescr.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(popupTypeEdit);
});

// Слушатель на кнопку добавления новой карточки
profileAddBtn.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(popupTypeNewCard);
});

// Закрытие popup по крестику
closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonPopup = button.closest('.popup');
    closePopup(buttonPopup);
  });
});

// Вызов функции закрытия popup по клику на overlay
closePopupOverlay(popups);

// Добавление класса анимации
document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  });
});

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