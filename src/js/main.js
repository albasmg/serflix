'use strict';

const searchButton = document.querySelector('.js-searchButton');
const resultsContainer = document.querySelector('.js-resultsContainer');

const removeLastSearch = () => {
  resultsContainer.innerHTML = '';
};

const addListeners = () => {
  const series = document.querySelectorAll('.main__seriesContainer');
  for (const li of series) {
    li.addEventListener('click', handleAddToFavoritesClick);
  }
};
let favoriteSeries = [];

const handleAddToFavoritesClick = (event) => {
  event.currentTarget.classList.toggle('selected');
  const selectedSerieImage = event.currentTarget.querySelector('img').src;
  const selectedSerieName = event.currentTarget.querySelector(
    '.main__seriesName'
  ).innerHTML;

  const favoriteSerie = {
    name: selectedSerieName,
    image: selectedSerieImage,
  };

  favoriteSeries.push(favoriteSerie);
  console.log(favoriteSeries);

  addSerieToFavorites();
};

const addSerieToFavorites = () => {
  // const favoritesContainer = document.querySelector('.js-favoritesContainer');
  // const favoriteSerieContainer = document.createElement('div');
  // const favoriteSerieImage = document.createElement('img');
  // const favoriteSerieName = document.createElement('p');
  // favoritesContainer.appendChild(favoriteSerieContainer);
  // favoriteSerieContainer.appendChild(favoriteSerieImage);
  // favoriteSerieContainer.appendChild(favoriteSerieName);
  // console.log(favoritesContainer);
};

const printResults = (results) => {
  removeLastSearch();
  for (const result of results) {
    const serieName = result.show.name;
    const serieImage = result.show.image;

    const seriesContainer = document.createElement('li');
    const serieImageElement = document.createElement('img');
    const serieNameElement = document.createElement('p');
    const serieNameContent = document.createTextNode(`${serieName}`);

    resultsContainer.appendChild(seriesContainer);
    seriesContainer.appendChild(serieImageElement);
    seriesContainer.appendChild(serieNameElement);
    serieNameElement.appendChild(serieNameContent);

    serieImageElement.setAttribute(
      'src',
      !serieImage
        ? 'https://via.placeholder.com/210x295/ffffff/666666/? text=TV'
        : serieImage.medium
    );

    seriesContainer.classList.add('main__seriesContainer');
    serieNameElement.classList.add('main__seriesName');
  }
  addListeners();
};

const handleSearchButtonClick = () => {
  const searcherValue = document.querySelector('.js-searchInput').value;

  if (!searcherValue) {
    removeLastSearch();
    const alertMessageElement = document.createElement('p');
    const alertMessage = document.createTextNode('Escribe algo :)');
    resultsContainer.appendChild(alertMessageElement);
    alertMessageElement.appendChild(alertMessage);
  } else {
    fetch(`http://api.tvmaze.com/search/shows?q=${searcherValue}`)
      .then((response) => response.json())
      .then((data) => {
        printResults(data);
      });
  }
};

searchButton.addEventListener('click', handleSearchButtonClick);
