import { createCard, handleDelete, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';

// DOM элементы
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageViewModal = document.querySelector('.popup_type_image');
const profileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;
const placeNameInput = addCardForm.elements['place-name'];
const placeLinkInput = addCardForm.elements.link;
const modalImage = imageViewModal.querySelector('.popup__image');
const modalCaption = imageViewModal.querySelector('.popup__caption');

// Обработчики событий
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const cardElement = createCard(newCard, handleDelete, handleLike, handleCardClick);
  cardsContainer.prepend(cardElement);
  closeModal(addCardModal);
  evt.target.reset();
}

function handleCardClick(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(imageViewModal);
}

// Инициализация карточек
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, handleDelete, handleLike, handleCardClick);
  cardsContainer.append(cardElement);
});

// Навешивание обработчиков
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener('click', () => openModal(addCardModal));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});