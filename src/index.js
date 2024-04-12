import './pages/index.css'; // добавьте импорт главного файла стилей
import { deleteCard, createCard } from './scripts/index.js';

initialCards.forEach(function(item) {
  const cardItem = createCard(item, deleteCard);
  placesList.append(cardItem);
});

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import addIconImage from './images/add-icon.svg';
import avatarImage from './images/avatar.jpg';
import cardOneImage from './images/card_1.jpg';
import cardTwoImage from './images/card_2.jpg';
import cardThreeImage from './images/card_3.jpg';
import closeImage from './images/close.svg';
import deleteIconImage from './images/delete-icon.svg';
import editIconImage from './images/edit-icon.svg';
import likeActiveImage from './images/like-active.svg';
import likeInactiveImage from './images/like-inactive.svg';
import logoImage from './images/logo.svg';

const imagesProject = [
  // меняем исходные пути на переменные
  { name: 'add icon', link: addIconImage },
  { name: 'avatar', link: avatarImage },
  { name: 'card1', link: cardOneImage },
  { name: 'card2', link: cardTwoImage },
  { name: 'card3', link: cardThreeImage },
  { name: 'close', link: closeImage },
  { name: 'delete icon', link: deleteIconImage },
  { name: 'edit icon', link: editIconImage },
  { name: 'like active', link: likeActiveImage },
  { name: 'like inactive', link: likeInactiveImage },
  { name: 'logo', link: logoImage },
];