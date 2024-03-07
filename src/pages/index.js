import './index.css';
import {
  burgerMenuButton,
  smallMenuOverlay,
  smallNavMenu,
  buttonCloseSmallNavMenu,
  buttonsOpenForm,
  popupWithForm,
  popupTitle,
  popupTinkoff,
  buttonOpenTinkoff,
  messengerLinks,
  chatLinks,
  overlay,
  chatButton,
  galleryPhotoElements,
  popupWithImage,
  popupOpenedImage,
  sliderWrapper,
  nextSlide,
  prevSlide,
  buttonConfirmation,
  popupConfirmSentForm,
  subtitleSendFormConfirmation,
  forms,
  agreementCheckboxes,
  smallMenuLinks,
  slidesNumber,
  root,
  buttonToUp,
  buttonCloseBanner,
  tinkoffBanner,
  navMenu,
} from '../components/variables';
import { closePopup, closeSmallMenu, openPopup, openSmallMenu } from '../components/modal';
import {
  activateSubmitButton,
  deactivateSubmitButton,
  enableValidation,
  hasInvalidInputs,
  toggleButtonSendingData,
} from '../components/validation';
import maskPhone from '../components/mask';
import { unlockScroll } from '../components/utils';

export const settings = {
  formElement: '.form',
  inputElement: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: '.form__input-error',
};

export let scrollWidth = window.innerWidth - root.offsetWidth + 'px';
let slideWidthCounter = 0;
let slideWidth = document.querySelector('.our-production__slider-image').offsetWidth;

//Слушатель на бургер меню
burgerMenuButton.addEventListener('click', openSmallMenu);
buttonCloseSmallNavMenu.addEventListener('click', closeSmallMenu);
smallMenuOverlay.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('nav-menu-small__overlay')) {
    closeSmallMenu();
  }
});

// Слушатель на все кнопки открытия попапа и замены текста заголовка
buttonsOpenForm.forEach((button) => {
  button.addEventListener('click', () => {
    popupTitle.textContent = button.textContent;
    openPopup(popupWithForm);
  });
});
buttonOpenTinkoff.addEventListener('click', function () {
  openPopup(popupTinkoff);
});
// Слушатели для иконки мессенджера и оверлея
messengerLinks.forEach((messengerLink) => {
  messengerLink.addEventListener('click', () => {
    chatLinks.classList.remove('messenger__links_active');
    overlay.style.display = 'none';
  });
});
document.addEventListener('click', function (evt) {
  if (evt.target.id === 'overlay') {
    chatLinks.classList.remove('messenger__links_active');
    overlay.style.display = 'none';
  }
  if (evt.target === chatButton) {
    chatLinks.classList.toggle('messenger__links_active');
    overlay.style.display = 'block';
  }
});

// Слушатель на открытия попапа с картинкой
galleryPhotoElements.forEach((element) => {
  element.addEventListener('click', (evt) => {
    openPopup(popupWithImage);
    popupOpenedImage.src = evt.target.src;
    popupOpenedImage.alt = evt.target.alt;
  });
});

// Слайдер
nextSlide.addEventListener('click', () => {
  nextSlide.disabled = true;
  slideWidthCounter += slideWidth;
  sliderWrapper.style.transform = `translateX(-${slideWidthCounter}px)`;
  if (slideWidthCounter === slideWidth * slidesNumber) {
    sliderWrapper.style.transform = `translateX(0)`;
    slideWidthCounter = 0;
  }
  setTimeout(() => {
    nextSlide.disabled = false;
  }, 1000);
});

prevSlide.addEventListener('click', () => {
  prevSlide.disabled = true;
  slideWidthCounter -= slideWidth;
  sliderWrapper.style.transform = `translateX(-${slideWidthCounter}px)`;
  if (slideWidthCounter === -slideWidth) {
    sliderWrapper.style.transform = `translateX(-${slideWidth * (slidesNumber - 1)}px)`;
    slideWidthCounter = slideWidth * (slidesNumber - 1);
  }
  setTimeout(() => {
    prevSlide.disabled = false;
  }, 1000);
});

buttonConfirmation.addEventListener('click', () => {
  closePopup(popupConfirmSentForm);
});

forms.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonSendingData(false, evt);
    const formData = new FormData(form);
    fetch('sendmail.php', { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка:${response.status}`);
        }
      })
      .then((response) => {
        subtitleSendFormConfirmation.textContent = response.message;
        closePopup(popupWithForm);
      })
      .catch((error) => {
        subtitleSendFormConfirmation.textContent = error.message;
        closePopup(popupWithForm);
      })
      .finally(() => {
        toggleButtonSendingData(true, evt);
        setTimeout(() => {
          openPopup(popupConfirmSentForm);
        }, 200);
      });
    form.reset();
    deactivateSubmitButton(form);
  });
});

enableValidation(settings);

agreementCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (evt) => {
    const closestForm = evt.target.closest('.form');
    const agreementCheckbox = closestForm.querySelector('input[name=agreement]');
    if (hasInvalidInputs(Array.from(closestForm.querySelectorAll('.form__input'))) || !agreementCheckbox.checked) {
      deactivateSubmitButton(closestForm);
    } else {
      activateSubmitButton(closestForm);
    }
  });
});
smallMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    unlockScroll();
    smallMenuOverlay.classList.remove('nav-menu-small__overlay_active');
    smallNavMenu.classList.remove('nav-menu-small_active');
  });
});

screen.orientation.addEventListener('change', () => {
  scrollWidth = window.innerWidth - root.offsetWidth + 'px';
  slideWidth = document.querySelector('.our-production__slider-image').offsetWidth;
  sliderWrapper.style.transform = `translateX(0)`;
  slideWidthCounter = 0;
});

// Функция, которая добавляет стиль для кнопки при прокрутке
function scrollScreenToTop(scrollDistance) {
  if (window.scrollY >= scrollDistance) {
    buttonToUp.style.display = 'flex';
  } else {
    buttonToUp.style.display = 'none';
  }
}
window.addEventListener('scroll', function () {
  const scrollDistance = 2000;
  scrollScreenToTop(scrollDistance);
});
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
buttonToUp.addEventListener('click', scrollToTop);
buttonCloseBanner.addEventListener('click', () => {
  tinkoffBanner.style.display = 'none';
  if (window.innerWidth > 529) {
    navMenu.style.padding = '60px 15px 15px';
  } else if (window.innerWidth <= 529 && window.innerWidth > 380) {
    navMenu.style.padding = '90px 15px 15px';
  } else {
    navMenu.style.padding = '60px 15px 15px';
  }
});

maskPhone('input[name="number"]');
