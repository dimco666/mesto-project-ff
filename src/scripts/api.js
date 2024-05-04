//запрос на получение данных о пользователе
const editProfileTitle = document.querySelector('.profile__title');
const editProfileDescription = document.querySelector('.profile__description');
const editProfileAvatar = document.querySelector('.profile__image');

fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  method: 'GET',
  headers: {
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  }
})
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    console.log(data);
    editProfileTitle.textContent = data.name;
    editProfileDescription.textContent = data.about;
    editProfileAvatar.style.backgroundImage = data.avatar;//не работает
  });

const handleRes = (res) => {
    if(res.ok) {
      return res.json();
    }
  }

//запрос на получение массива карточек
export const getAllCards = () => {
fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'GET',
  headers: {
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  }
})
  .then(handleRes)
};

export const createCards = (data) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
    authorization: '43dbcb1d-1b96-42eb-95fc-d0eb8a940d2b'
  },
  body: JSON.stringify(data)
})
  .then(handleRes)
};