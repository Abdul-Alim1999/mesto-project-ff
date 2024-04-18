const cardTemplate = document.querySelector('#card-template').content;

function addCard(card, cardDelete) {
  const cloneTemplate = cardTemplate.querySelector('.card').cloneNode(true);
  const placeList = document.querySelector('.places__list');
  const cardDeleteButton = cloneTemplate.querySelector('.card__delete-button');

  cardDeleteButton.addEventListener('click', function(){
    cardDelete(cloneTemplate)
  })
  cloneTemplate.querySelector('.card__image').src = card.link
  cloneTemplate.querySelector('.card__image').alt = card.name
  
  cloneTemplate.querySelector('.card__title').textContent = card.name

  placeList.append(cloneTemplate)
}

function cardDelete(card) {
  card.remove()
}

for(let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], cardDelete)
}




































































