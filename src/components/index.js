//       *      
//      ***     
//     *****    
//    *******   
//   *********  
//  *********** 
//      |||     
//      |||     
//
//  С Новым 2025 годом!
//  Пусть ваш код всегда будет чистым и без ошибок!

import { createCard, handleDelete, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { clearValidation, enableValidation } from "./validation.js";
import { apiUserInfo, apiCard, apiNewPlace, apiEditProfiInfo, apiEditProfileImage } from './api.js';

// Определение переменных
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const cardsContainer = document.querySelector('.places__list');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
const imagePopup = document.querySelector('.popup_type_image');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url');
const addCardForm = addCardModal.querySelector('.popup__form');
const profileForm = profileEditModal.querySelector('.popup__form');
const avatarForm = editAvatarModal.querySelector('.popup__form');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId = ''; // Переменная для хранения ID пользователя

// Загрузка информации о пользователе и карточек
Promise.all([apiUserInfo(), apiCard()])
  .then(([userInfo, cards]) => {
    // Сохранение ID пользователя
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // Инициализация карточек
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, handleDelete, handleLike, handleCardClick, userId);
      cardsContainer.append(cardElement);
    });
  })
  .catch(err => {
    console.error(`Ошибка загрузки данных: ${err}`);
  });

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  apiEditProfiInfo(nameInput.value, descriptionInput.value).then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    closeModal(profileEditModal);
  }).catch(err => {
    console.error(`Ошибка обновления профиля: ${err}`);
  }).finally(() => {
    submitButton.textContent = originalButtonText;
  });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  apiNewPlace(newCard).then(cardData => {
    const cardElement = createCard(cardData, handleDelete, handleLike, handleCardClick, userId);
    cardsContainer.prepend(cardElement);
    closeModal(addCardModal);
    evt.target.reset();
    clearValidation(validationConfig, addCardForm); // Очистка ошибок валидации
  }).catch(err => {
    console.error(`Ошибка добавления новой карточки: ${err}`);
  }).finally(() => {
    submitButton.textContent = originalButtonText;
  });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  apiEditProfileImage(avatarUrlInput.value).then((userInfo) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    closeModal(editAvatarModal);
  }).catch(err => {
    console.error(`Ошибка обновления аватара: ${err}`);
  }).finally(() => {
    submitButton.textContent = originalButtonText;
  });
}

// Определение функции handleCardClick
function handleCardClick(cardData) {
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');
  
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;

  openModal(imagePopup);
}

// Добавление слушателей событий
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(validationConfig, profileForm); // Очистка ошибок валидации
  openModal(profileEditModal);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  clearValidation(validationConfig, addCardForm); // Очистка ошибок валидации
  openModal(addCardModal);
});

profileImage.addEventListener('click', () => {
  clearValidation(validationConfig, avatarForm); // Очистка ошибок валидации
  openModal(editAvatarModal);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Добавление обработчиков событий для кнопок закрытия модальных окон
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Включение валидации форм
enableValidation(validationConfig);