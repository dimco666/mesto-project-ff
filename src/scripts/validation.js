//функция, которая показывает ошибку
const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
    const nameInputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    nameInputError.textContent = errorMessage;
    nameInputError.classList.add(validationConfig.errorClass);
  };
  //функция, скрывающая ошибку
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const nameInputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    nameInputError.classList.remove(validationConfig.errorClass);
    nameInputError.textContent = '';
  };
  // Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) { //кастомное сообщение об ошибке, выдает undefined
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  }
  
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  }
  
  export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, validationConfig);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      clearValidation(formElement, validationConfig);
    });
  };