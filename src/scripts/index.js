// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cards = placesList.querySelectorAll('.card');
const addButton = content.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const editButton = content.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = document.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const modalImage = popupImage.querySelector('.popup__image');
const modalImageCaption = popupImage.querySelector('.popup__caption');

import { initialCards } from './cards.js';

initialCards.forEach(function(item) {
  const cardItem = createCard(item, deleteCard, handleClickCard);
  placesList.append(cardItem);
});

export function deleteCard(cardElement) {
  cardElement.remove();
}

function handleClickCard(evt) {
  const imageUrl = evt.link;
  const imageAlt = evt.name;
  openPopup(popupImage);
}

export function createCard(item, deleteCard, handleClickCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

    function handleDeleteButtonClick() {
      deleteCard(cardElement);
    }

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    modalImage.addEventListener('click', () => {handleClickCard(evt)});

  return cardElement;
}

//функции открытия и закрытия попапа
function openPopup(modalPopup) {
  modalPopup.classList.add('popup_is-opened');
}

function closePopup(modalPopup) {
  modalPopup.classList.remove('popup_is-opened');
}
//слушатели открытия
editButton.addEventListener('click', () => {
  openPopup(popupEdit)
});

addButton.addEventListener('click', () => {
  openPopup(popupNewCard)
});
//слушатели закрытия
/*
closeButton[0].addEventListener('click', () => {
  closePopup(popupEdit)
});

closeButton[1].addEventListener('click', () => {
  closePopup(popupNewCard)
});
*/

popups.forEach((modalPopup) => {
  modalPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(modalPopup);
    }
  });
});