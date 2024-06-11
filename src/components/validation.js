export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  toggleButtonState(inputs, button, config);
}

function checkInputValidity(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, errorElement, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = getCustomErrorMessage(input) || input.validationMessage;
    errorElement.classList.add(config.errorClass);
    errorElement.classList.add('popup__input-error_visible');
  }
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    errorElement.classList.remove('popup__input-error_visible');
  }
}

function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  
  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, button, config);
}

function getCustomErrorMessage(input) {
  const validity = input.validity;
  if (validity.valueMissing) {
    return 'Вы пропустили поле.';
  } else if (validity.patternMismatch) {
    return input.dataset.error;
  } else if (validity.tooShort) {
    return `Минимальная длина ${input.minLength} символов. Сейчас ${input.value.length}.`;
  } else if (validity.tooLong) {
    return `Максимальная длина ${input.maxLength} символов. Сейчас ${input.value.length}.`;
  } 
  return null;
}
