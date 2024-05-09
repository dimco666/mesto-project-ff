import './pages/index.css'; // добавьте импорт главного файла стилей

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cards = placesList.querySelectorAll('.card');
const addButton = content.querySelector('.profile__add-button');
const editButton = content.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = document.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const updateAvatarButton = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const modalImage = popupImage.querySelector('.popup__image');
const modalImageCaption = popupImage.querySelector('.popup__caption');
const nameProfileValue = document.querySelector('.profile__title');
const jobProfileValue = document.querySelector('.profile__description');

import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { getUserData, getAllCards, editDataProfile, createCards, updateAvatar } from './scripts/api.js';

/*initialCards.forEach(function(item) {
  const cardItem = createCard(item, deleteCard, handleClickCard, likeCard);
  placesList.append(cardItem);
});*/
//функция открытия попапа карточки по щелчку на картинку
function handleClickCard(item) {
  modalImage.src = item.link;
  modalImage.alt = item.name;
  modalImageCaption.textContent = item.name;
  openPopup(popupImage);
}

//слушатели открытия
editButton.addEventListener('click', () => {
  nameInput.value = nameProfileValue.textContent;
  jobInput.value = jobProfileValue.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupNewCard)
});

updateAvatarButton.addEventListener('click', () => {
  openPopup(popupUpdateAvatar)
});

//закрытие попапов по крестику ИЛИ по оверлею
popups.forEach((modalPopup) => {
  modalPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(modalPopup);
    }
  });
});

//форма редактирования профиля
// Находим форму в DOM
const profileFormElement = document.querySelector('.popup_type_edit .popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profileFormElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = profileFormElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
  

    editDataProfile(nameValue, jobValue)
    .then((data) => {
    nameProfileValue.textContent = data.name;
    jobProfileValue.textContent = data.about;
    console.log(data);
    });

    closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
//обработчик сабмит кнопки добавления новой карточки
const formElementAddCard = document.querySelector('.popup_type_new-card .popup__form');
const nameInputAddCard = document.querySelector('.popup__input_type_card-name');
const linkInputAddCard = document.querySelector('.popup__input_type_url');

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const nameAddCardValue = nameInputAddCard.value;
  const linkAddCardValue = linkInputAddCard.value; 

  const item = {
    name: nameAddCardValue,
    link: linkAddCardValue
  }

  createCards(nameAddCardValue, linkAddCardValue)
  .then((data) => {
    item.name = data.name;
    item.link = data.link;
    console.log(data);
  })

  const cardItem = createCard(item, deleteCard, handleClickCard, likeCard);
  placesList.prepend(cardItem);

  formElementAddCard.reset();

  closePopup(popupNewCard);
}

formElementAddCard.addEventListener('submit', handleAddCardSubmit);
//форма и инпут с именем в форме

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//функция, которая показывает ошибку
const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
  const nameInputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  nameInputError.textContent = errorMessage;
  nameInputError.classList.add(validationConfig.errorClass);
};
//функция, скрывающая ошибку
const hideInputError = (formElement, inputElement, validationConfig) => {
  const nameInputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  nameInputError.classList.remove(validationConfig.errorClass);
  nameInputError.textContent = '';
};
// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) { //кастомное сообщение об ошибке, выдает undefined
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);

Promise.all([getUserData(), getAllCards()])
.then(([dataUser, data]) => {
  const userName = dataUser.name;
  const userAbout = dataUser.about;
  const userId = dataUser._id;
  document.querySelector('.profile__title').textContent = userName;
  document.querySelector('.profile__description').textContent = userAbout;
  document.querySelector('.profile__image').style.backgroundImage = `url(${dataUser.avatar})`;
  console.log({
    dataUser, data
  });
  Array.from(data).forEach((item) => {
    const dataCard = {
      name: item.name,
      link: item.link,
      likes: item.likes.length,
      profileId: item.owner._id
    };
    placesList.append(createCard(dataCard, deleteCard, handleClickCard, likeCard, userId));
    });
})
/*
updateAvatar(linkUpdateAvatarValue)
  .then((data) => {
    const formElementUpdateAvatar = document.querySelector('.popup_type_update-avatar .popup__form');
    const linkInputUpdateAvatar = formElementUpdateAvatar.querySelector('.popup__input_type_update-avatar');
    const linkUpdateAvatarValue = linkInputUpdateAvatar.value;
    document.querySelector('.profile__image').style.backgroundImage = linkUpdateAvatarValue;
    linkUpdateAvatarValue = `url(${data.avatar})`;
    closePopup(popupUpdateAvatar);
  })

  formElementUpdateAvatar.addEventListener('submit', updateAvatar);*/