import { apiDeleteCard, apiLikePost, apiDeleteLikePost, userId } from './api.js';
import { openModal, closeModal } from './modal.js';

export function createCard(cardData, handleDelete, handleLike, handleCardClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.dataset.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  // Проверка, лайкнул ли пользователь карточку
  if (cardData.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Проверка, создана ли карточка текущим пользователем
  if (cardData.owner._id !== userId) {
    cardDeleteButton.style.display = 'none';
  }

  cardLikeButton.addEventListener('click', handleLike);
  cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));
  cardImage.addEventListener('click', () => handleCardClick(cardData));

  return cardElement;
}

export function handleLike(evt) {
  const cardElement = evt.target.closest('.card');
  const cardId = cardElement.dataset.id;
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    apiDeleteLikePost(cardId).then((updatedCard) => {
      evt.target.classList.remove('card__like-button_is-active');
      cardLikeCount.textContent = updatedCard.likes.length;
    }).catch(err => {
      console.error(`Ошибка удаления лайка: ${err}`);
    });
  } else {
    apiLikePost(cardId).then((updatedCard) => {
      evt.target.classList.add('card__like-button_is-active');
      cardLikeCount.textContent = updatedCard.likes.length;
    }).catch(err => {
      console.error(`Ошибка добавления лайка: ${err}`);
    });
  }
}

export function handleDelete(cardElement) {
  const cardId = cardElement.dataset.id;
  const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
  openModal(confirmDeleteModal);

  confirmDeleteModal.querySelector('.popup__form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    apiDeleteCard({ idPost: cardId }).then(() => {
      cardElement.remove();
      closeModal(confirmDeleteModal);
    }).catch(err => {
      console.error(`Ошибка удаления карточки: ${err}`);
    });
  }, { once: true });
}