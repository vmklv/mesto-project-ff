// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточек
const cardContainer = document.querySelector('.places__list'); //контейнер для добавления новых карточек

// @todo: Функция создания карточки
function createCardElement() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

// @todo: Функция добавления контента для карточки
function fillCardData(cardElement, name, link) {
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = `Фото с локации ${name}`;
}

// @todo: Колбэк удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция инициализации слушателей событий для карточки
function initCardListeners(cardElement, deleteCallback) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(cardElement));
}

// @todo: Функция создания карточки с данными и колбэком удаления
function createCard(name, link, deleteCallback) {
  const cardElement = createCardElement();
  fillCardData(cardElement, name, link);
  initCardListeners(cardElement, deleteCallback);
  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link, deleteCard);
  cardContainer.append(cardElement);
});