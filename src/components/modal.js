//функция открытия popup
export function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc)
  popup.classList.add('popup_is-opened', 'popup_is-animated')
}

////функция закрытия popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_is-opened')
}

//функция закрытия по Escape
function closePopupByEsc(e) {
  if (e.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

// Закрытие popup по клику за пределами popup
export function closePopupOverlay(popups) {
  popups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        closePopup(popup)
      }
    })
  })
}