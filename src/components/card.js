//функция создания карточки 
export function createCard(card,cardDelete,openImagePopup, addLike) {
  const cardTemplate = document.querySelector('#card-template').content
  const cloneTemplate = cardTemplate.querySelector('.card').cloneNode(true)

  const cardDeleteButton = cloneTemplate.querySelector('.card__delete-button')
  cardDeleteButton.addEventListener('click', () => cardDelete(cloneTemplate))

  const cardImage = cloneTemplate.querySelector('.card__image')
  cardImage.addEventListener('click', () => openImagePopup(card.link, card.name));
  cardImage.src = card.link
  cardImage.alt = card.name

  cloneTemplate.querySelector('.card__title').textContent = card.name

  const likeButton = cloneTemplate.querySelector('.card__like-button')
  likeButton.addEventListener('click', addLike)

  return cloneTemplate
}

//функция удаления карточки
export  function cardDelete(card) {
  card.remove()
}

//функция лайка
export function addLike(card) {
  card.target.classList.toggle('card__like-button_is-active')
}