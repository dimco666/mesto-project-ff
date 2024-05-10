import { deleteCards } from "./api.js";

export function createCard(item, deleteCard, handleClickCard, likeCard, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikes = cardElement.querySelector('.card__likes-counter');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    cardLikes.textContent = item.likes;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      deleteCards(item._id);
      deleteCard(cardElement);
    });
  
    cardImage.addEventListener('click', () => {handleClickCard(item)});
  
    cardLikeButton.addEventListener('click', likeCard);

    if(item.profileId !== userId) {
      deleteButton.style.display = 'none';
    }

    return cardElement;
  }

  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }