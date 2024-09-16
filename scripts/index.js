// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;

  // @todo: Функция удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });

  cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  addCard(card.name, card.link);
});