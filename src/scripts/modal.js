  //функции открытия и закрытия попапа
  export function openPopup(modalPopup) {
    modalPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
  }
  
  export function closePopup(modalPopup) {
    modalPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  }

  function closeByEscape(event) {
    if(event.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    }
}