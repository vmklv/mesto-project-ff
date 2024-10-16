export function createCard(cardData, handleDelete, handleLike, handleImageClick) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => handleDelete(cardElement));
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}

export function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function handleDelete(cardElement) {
  cardElement.remove();
}

function getCardTemplate() {
  return document.querySelector('#card-template').content.cloneNode(true).querySelector('.card');
}