import { deleteCards, newLikeCard, deleteLikeCard } from "./api.js";

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
    cardLikes.textContent = item.likes.length;
    const cardID = item._id;
    
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    cardImage.addEventListener('click', () => {handleClickCard(item)});
  
    cardLikeButton.addEventListener('click', () => {likeCard(cardLikeButton, cardID)});

    if(item.profileId !== userId) {
      deleteButton.style.display = 'none';
    } else {
      deleteButton.addEventListener('click', () => {deleteCard(cardElement, cardID)});
    }

    return cardElement;
  }

  export function deleteCard(cardElement, cardID) {
    deleteCards(cardID)
    .then((res) => {
      console.log(res);
      cardElement.remove();
    })
  }
  
  export const likeCard = (cardLikeButton, cardID) => {
    const eventLikeCount = cardLikeButton.closest('.places__item').querySelector('.card__likes-counter');
    const likeMethod = cardLikeButton.classList.contains('card__like-button_is-active') ? deleteLikeCard : newLikeCard;
    likeMethod(cardID)
    .then((res) => {
      eventLikeCount.textContent = res.likes.length;
      cardLikeButton.classList.toggle('card__like-button_is-active')
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }