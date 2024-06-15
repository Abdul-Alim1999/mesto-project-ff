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
    const errorMessage = getErrorMessage(input);
    showInputError(input, errorElement, errorMessage, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return input.dataset.requiredError;
  }
  if (input.validity.tooShort) {
    return input.dataset.tooShortError;
  }
  if (input.validity.tooLong) {
    return input.dataset.tooLongError;
  }
  if (input.validity.patternMismatch) {
    return input.dataset.patternError;
  }
  return input.validationMessage;
}

function showInputError(input, errorElement, errorMessage, config) {
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
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