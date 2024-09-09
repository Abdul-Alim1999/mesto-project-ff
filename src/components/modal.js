//функция открытия попапа
export const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupByEsc)
  popup.classList.add('popup_is-opened')
}


//функция закрытия попапа
export const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_is-opened')
}


//функция закрытия попапа по клику на Escape
const closePopupByEsc = (event) => {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}


//функция закрытия попапа по клику на Overlay
export const closePopupByOverlay = (popups) => {
  popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup')) {
        closePopup(popup)
      }
    })
  })
}