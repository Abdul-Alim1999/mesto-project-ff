const TOKEN   = '8938d4f9-8431-4d0c-a942-409d4667659d'
const COHORT  = 'wff-cohort-15'

const config = {
  url: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

// Функция для получения информации о пользователе
export function getUser() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
}

// Функция для получения карточек
export const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

// Функция для обновления данных пользователя
export function updateUser(name, about) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
}

// Функция для создания новой карточки
export const createCardOnServer = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

// Установка лайка карточке на сервере
export const likeCard = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

// Снятие лайка с карточки на сервере
export const unlikeCard = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

// Функция для обновления аватара пользователя
export function updateUserAvatar(avatarUrl) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
}
