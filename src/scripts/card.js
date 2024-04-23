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

  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }