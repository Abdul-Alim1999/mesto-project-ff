//функция создания карточки
export function createCard(card, cardDelete, openPopupImage) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true)
  const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button')
  cardDeleteBtn.addEventListener('click', () => cardDelete(cardTemplateClone))

  const cardImage = cardTemplateClone.querySelector('.card__image')
  cardImage.addEventListener('click', () => openPopupImage(card.link, card.name))
  cardImage.src = card.link
  cardImage.alt = card.name

  cardTemplateClone.querySelector('.card__title').textContent = card.name

  const likeButton = cardTemplateClone.querySelector('.card__like-button')
  likeButton.addEventListener('click', addLike)

  return cardTemplateClone
}

//функция удалния карточки
export function cardDelete(card) {
  card.remove()
}

//функция лайка
export function addLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}