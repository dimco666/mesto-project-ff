// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

let content = document.querySelector('.content');
let placesList = content.querySelector('.places__list');
let cards = placesList.querySelectorAll('.card');
let addButton = content.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(function(element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (event) {
      event.target.closest('.card').remove();
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', function (event) {
      event.target.classList.toggle('card__like-button_is-active');
    });
    placesList.append(cardElement);
});

function addCard() {
  const templateCopy = cardTemplate.cloneNode(true);
  templateCopy.querySelector('.card__image').src = ''.alt = '';
  templateCopy.querySelector('.card__delete-button');
  templateCopy.querySelector('.card__like-button');
  templateCopy.querySelector('.card__title').textContent = '';
  templateCopy.querySelector('.card__delete-button').addEventListener('click', function (event) {
    event.target.closest('.card').remove();
  });
  templateCopy.querySelector('.card__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_is-active');
  });
  placesList.append(templateCopy);
}
addButton.addEventListener('click', addCard);