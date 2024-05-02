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
const popups = document.querySelectorAll('.popup');
const modalImage = popupImage.querySelector('.popup__image');
const modalImageCaption = popupImage.querySelector('.popup__caption');
const nameProfileValue = document.querySelector('.profile__title');
const jobProfileValue = document.querySelector('.profile__description');

import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

initialCards.forEach(function(item) {
  const cardItem = createCard(item, deleteCard, handleClickCard, likeCard);
  placesList.append(cardItem);
});
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
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameProfileValue.textContent = nameValue;
    jobProfileValue.textContent = jobValue;

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
const showInputError = (inputElement, formElement, errorMessage) => {
  const nameInputError = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  nameInputError.textContent = errorMessage;
  nameInputError.classList.add('popup__error_visible');
};
//функция, скрывающая ошибку
const hideInputError = (inputElement, formElement) => {
  const nameInputError = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  nameInputError.classList.remove('popup__error_visible');
  nameInputError.textContent = '';
};
// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();