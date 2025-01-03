const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '47b8f684-02f2-40d8-86f3-dbb650be2bd3',
    'Content-Type': 'application/json'
  }
};

// Функция для проверки ответа сервера
function checkResponse(response) {
  if (response.ok) {
    return response.json(); // Если ответ успешен, возвращаем JSON
  }
  return Promise.reject(`Ошибка: ${response.status}`); // Иначе возвращаем ошибку
}

let userId = ''; // Переменная для хранения ID пользователя

// Функция для получения информации о пользователе
export function apiUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(checkResponse);
}

// Функция для получения карточек
export function apiCard() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(checkResponse);
}

// Функция для создания новой карточки
export function apiNewPlace(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  }).then(checkResponse);
}

// Функция для обновления информации о профиле
export function apiEditProfiInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(checkResponse);
}

// Функция для обновления аватара пользователя
export function apiEditProfileImage(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  }).then(checkResponse);
}

// Функция для удаления карточки
export function apiDeleteCard({ idPost }) {
  return fetch(`${config.baseUrl}/cards/${idPost}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
}

// Функция для добавления лайка карточке
export function apiLikePost(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(checkResponse);
}

// Функция для удаления лайка карточки
export function apiDeleteLikePost(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
}

export { userId };