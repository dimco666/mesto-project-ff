const handleRes = (res) => {
    if(res.ok) {
      return res.json();
    }
  }

//запрос на получение данных о пользователе
export const getUserData = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  method: 'GET',
  headers: {
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  }
})
  .then(handleRes)
};
//запрос на получение массива карточек
export const getAllCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'GET',
  headers: {
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  }
})
  .then(handleRes)
};
//запрос на создание карточки
export const createCards = (itemName, itemLink) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  },
  body: JSON.stringify({
    name: `${itemName}`,
    link: `${itemLink}`
  })
})
  .then(handleRes)
};
//запрос на изменение данных профиля
export const editDataProfile = (dataName, dataJob) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
    },
    body: JSON.stringify({
      name: `${dataName}`,
      about: `${dataJob}`
  })
  })
  .then(handleRes)
};
//запрос на изменение аватара
export const updateAvatar = (dataAvatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar', {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
    },
    body: JSON.stringify({
      avatar: `${dataAvatar}`
  })
  })
  .then(handleRes)
};

//запрос на удаление карточки
export const deleteCards = (itemId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${itemId}`, {
    method: 'DELETE',
    headers: {
      authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
    },
    body: JSON.stringify({
      _id: `${itemId}`
  })
  })
  .then(handleRes)
};