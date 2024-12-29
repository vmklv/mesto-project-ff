//функция показывающая ошибку
function showInputError(
  validationConfig,
  formElement,
  inputElement,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

//функция скрывающая ошибку
function hideInputError(validationConfig, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

//функция проверяющая валидность инпутов
function checkInputValid(validationConfig, formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
}

// проверяем невалидность инпутов(наличие ошибки)
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// меняет доступ к кнопке
function toggleButtonState(validationConfig, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", true);
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// функция вешающая слушатель набора текста на каждый инпут
function setEventListeners(validationConfig, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValid(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
}

//функция очищает ошибки валидации формы и делает кнопку неактивной
function clearValidation(validationConfig, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, formElement, inputElement);
  });
}

// функция вызова валидации со всем функционалом
function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, formElement);
  });
}

export { clearValidation, enableValidation };