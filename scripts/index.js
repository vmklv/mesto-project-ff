// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');


// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
  addCard(card.name, card.link);
})
