//функция открытия popup
export function openPopup(popup) {
  popup.addEventListener('keydown', closePopupByEsc)
  popup.classList.add('popup_is-opened', 'popup_is-animated')
}

////функция закрытия popup
export function closePopup(popup) {
  popup.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_is-opened')
}

//функция закрытия по Escape
function closePopupByEsc(e) {
  if (e.key === 'Escape') {
    closePopup(popup)
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