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

    cardElement.querySelector('.card__image').src = element.image;
    cardElement.querySelector('.card__title').textContent = element.name;

    placesList.append(cardElement);
});

function addCard() {
    placesList.innerHTML += `
    <li class="places__item card">
    <img class="card__image" src="" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>`;
}
addButton.addEventListener('click', addCard);

const deleteCardButton = document.querySelector('.card__delete-button');

deleteCardButton.addEventListener('click', function () {
    const cardItem = deleteCardButton.closest('.card');
    cardItem.remove();
});