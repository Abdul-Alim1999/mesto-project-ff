import { likeCard, unlikeCard, deleteCardOnServer } from './api.js';

// Функция создания карточки
export function createCard(card, userId, openPopupImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardTemplateClone.querySelector('.card__image');
  cardImage.addEventListener('click', () => openPopupImage(card.link, card.name));
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardTemplateClone.querySelector('.card__title').textContent = card.name;

  const likeButton = cardTemplateClone.querySelector('.card__like-button');
  const likeCounter = cardTemplateClone.querySelector('.card__like-counter');
  likeCounter.textContent = card.likes.length;

  if (card.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      unlikeCard(card._id)
        .then(updatedCard => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeCard(card._id)
        .then(updatedCard => {
          likeButton.classList.add('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // Проверка на владельца карточки
  if (card.owner._id === userId) {
    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', () => cardDelete(cardTemplateClone, card._id));
  } else {
    // Удалить иконку корзинки, если пользователь не является владельцем
    cardTemplateClone.querySelector('.card__delete-button').remove();
  }

  return cardTemplateClone;
}


// Функция удаления карточки
export function cardDelete(cardElement, cardId) {
  deleteCardOnServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция лайка
export function addLike(event, likeCount, card) {
  event.target.classList.toggle('card__like-button_is-active');
  if (event.target.classList.contains('card__like-button_is-active')) {
    card.likes.push('dummyUserId');
  } else {
    card.likes.pop();
  }
  likeCount.textContent = card.likes.length;
}
