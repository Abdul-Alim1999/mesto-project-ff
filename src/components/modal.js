//функия открытия popup
export function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc)
  popup.classList.add('popup_is-opened')
}

//функция закрытия popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_is-opened')
}

////функция закрытия popup на Escape
export function closePopupByEsc(e) {
  if(e.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

//функция закрытия popup по клику на overlay
export function closePopupOverlay(popup) {
  popup.forEach((popup) => {
    popup.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup')) {
        closePopup(popup)
      }
    })
  })
}