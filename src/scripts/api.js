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

export const createCards = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  },
  body: JSON.stringify(data)
})
  .then(handleRes)
};

export const editDataProfile = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
    },
    body: JSON.stringify({
      name: editProfileTitle.textContent,
      about: editProfileDescription.textContent
    })
  })
  .then(handleRes)
}