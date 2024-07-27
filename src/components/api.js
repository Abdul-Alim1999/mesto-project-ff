const TOKEN   = '8938d4f9-8431-4d0c-a942-409d4667659d'
const COHORT  = 'wff-cohort-15'


// Конфигурационный объект для API-запросов
const config = {
  url: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}


//функция проверки ответа от сервера
const serverResponseCheck = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}


//функция запроса на получения пользователя
export const getUser = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then(serverResponseCheck)
}


//функция запроса на получения карточек
export const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
  .then(serverResponseCheck)
}


//функция запроса на добавления новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: 'POST', 
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then(serverResponseCheck)
}


//функция запроса на обновления данных профиля
export const updateUser = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about})
  })
  .then(serverResponseCheck)
}


//функция запроса на удаления карточки с сервера
export const deleteCardOnServer = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(serverResponseCheck)
}


//функция запроса на обновления аватара профиля
export const updateAvatar = (avatar) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then(serverResponseCheck)
}


//функция запроса на постановку лайка
export const likeCard = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(serverResponseCheck)
}


//функция запроса на снятия лайка
export const unlikeCard = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(serverResponseCheck)
}