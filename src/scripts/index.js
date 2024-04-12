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

import { initialCards } from './cards.js';

initialCards.forEach(function(item) {
  const cardItem = createCard(item, deleteCard);
  placesList.append(cardItem);
});

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(item, deleteCard) {
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
  return cardElement;
}

function openPopup() {
  popupEdit.style.display = 'flex';
}

function closePopup() {
  popupEdit.style.display = 'none';
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);