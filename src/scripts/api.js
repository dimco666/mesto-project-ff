const handleRes = (res) => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
      authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b',
      'Content-Type': 'application/json'
    }
  }

//запрос на получение данных о пользователе
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
})
  .then(handleRes)
};
//запрос на получение массива карточек
export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'GET',
  headers: config.headers
})
  .then(handleRes)
};
//запрос на создание карточки
export const createCards = (itemName, itemLink) => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: itemName,
    link: itemLink
  })
})
  .then(handleRes)
};
//запрос на изменение данных профиля
export const editDataProfile = (dataName, dataJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: dataName,
      about: dataJob
  })
  })
  .then(handleRes)
};

//запрос на изменение аватара
export const updateAvatar = (dataAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: dataAvatar
  })
  })
  .then(handleRes)
};

//запрос на удаление карточки
export const deleteCards = (itemId) => {
  return fetch(`${config.baseUrl}/cards/${itemId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: itemId
  })
  })
  .then(handleRes)
};

//запрос поставить лайк
export const newLikeCard = (itemId) => {
  return fetch(`${config.baseUrl}/cards/likes/${itemId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: itemId
  })
  })
  .then(handleRes)
};

//запрос убрать лайк
export const deleteLikeCard = (itemId) => {
  return fetch(`${config.baseUrl}/cards/likes/${itemId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: itemId
  })
  })
  .then(handleRes)
};