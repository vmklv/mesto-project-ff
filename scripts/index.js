// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточек
const cardContainer = document.querySelector('.places__list'); //контейнер для добавления новых карточек

// @todo: Функция создания карточки
function createCardElement() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

// @todo: Функция добавления контента для карточки
function cardData(cardElement, name, link) {
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });
}

// @todo: Функция добавления карточки в контейнер
function addCardToContainer(cardElement) {
  cardContainer.append(cardElement);
}

// @todo: Основная функция для создания и добавления карточки
function addCard(name, link) {
  const cardElement = createCardElement();
  cardData(cardElement, name, link);
  removeCard(cardElement);
  addCardToContainer(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  addCard(card.name, card.link);
});