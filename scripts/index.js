const cardTemplate = document.querySelector('#card-template').content;

function addCard(card, cardDelete) {
  const cloneTemplate = cardTemplate.querySelector('.card').cloneNode(true);
  const placeList = document.querySelector('.places__list');
  const cardButton = cloneTemplate.querySelector('.card__delete-button');
  cardButton.addEventListener('click', cardDelete)

  cloneTemplate.querySelector('.card__image').src = card.link
  cloneTemplate.querySelector('.card__title').textContent = card.name

  placeList.append(cloneTemplate)
}

function cardDelete() {
  document.querySelector('.card').remove()
}

for(let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], cardDelete)
}






























