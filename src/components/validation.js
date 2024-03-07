import {formOpenedPopup} from "./variables";
import {settings} from "../pages";

const toggleButtonState = (hasInvalidInputs, formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const agreementCheckbox = formElement.querySelector("input[name=agreement]")
  if (hasInvalidInputs || !agreementCheckbox.checked) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, formInput, errorMessage, config) => {
  formInput.classList.add(config.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, formInput, config) => {
  formInput.classList.remove(config.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = "";
};

const isValid = (formElement, formInput, errorMessage, config) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(errorMessage)
  } else {
    formInput.setCustomValidity("")
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, config);
  } else {
    hideInputError(formElement, formInput, config);
  }
};

const setEventListener = (formElement, inputElement, config) => {
  const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
  inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, inputElement.dataset.errorMessage, config);
    toggleButtonState(hasInvalidInputs(inputElementsList), formElement, config);
  });
};

const enableValidation = (config) => {
  const formElements = Array.from(document.querySelectorAll(config.formElement));
  formElements.forEach((formElement) => {
    const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
    inputElementsList.forEach((inputElement) => {
      setEventListener(formElement, inputElement, config);
    });
  });
}

const activateSubmitButton = (form) => {
  const buttonForm = form.querySelector(".form__submit")
  buttonForm.classList.remove("form__submit_disabled")
  buttonForm.disabled = false
}
const deactivateSubmitButton = (form) => {
  const buttonForm = form.querySelector(".form__submit")
  buttonForm.classList.add("form__submit_disabled")
  buttonForm.disabled = true
}

const toggleButtonSendingData = (isSent, evt) => {
  const buttonForm = evt.target.closest(".form")
  buttonForm.disabled = !isSent;
}

const checkInputs = () => {
  const inputElements = Array.from(formOpenedPopup.querySelectorAll(".form__input"));
  inputElements.forEach((inputElement) => {
    if (hasInvalidInputs(inputElements)) {
      hideInputError(formOpenedPopup, inputElement, settings)
    }
  })
}


export {
  toggleButtonState,
  hasInvalidInputs,
  showInputError,
  hideInputError,
  isValid,
  setEventListener,
  enableValidation,
  activateSubmitButton,
  deactivateSubmitButton,
  toggleButtonSendingData,
  checkInputs
}

