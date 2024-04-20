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
  const cardItem = createCard(item, deleteCard, handleClickCard, likeCard);
  placesList.append(cardItem);
});

export function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleClickCard(item) {
  modalImage.src = item.link;
  modalImage.alt = item.name;
  modalImageCaption.textContent = item.name;
  openPopup(popupImage);
}

export function createCard(item, deleteCard, handleClickCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

    function handleDeleteButtonClick() {
      deleteCard(cardElement);
    }

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    cardImage.addEventListener('click', () => {handleClickCard(item)});

    cardLikeButton.addEventListener('click', likeCard);

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

//закрытие попапов по крестику ИЛИ по оверлею
popups.forEach((modalPopup) => {
  modalPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(modalPopup);
    }
  });
});

//закрытие попапов по клавише Esc
popups.forEach((modalPopup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.code === "Escape" && modalPopup.classList.contains('popup_is-opened')) {
      closePopup(modalPopup);
    }
  });
});