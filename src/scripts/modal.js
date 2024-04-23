  //функции открытия и закрытия попапа
  export function openPopup(modalPopup) {
    modalPopup.classList.add('popup_is-opened');
  }
  
  export function closePopup(modalPopup) {
    modalPopup.classList.remove('popup_is-opened');
  }