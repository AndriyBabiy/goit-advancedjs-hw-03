import axios from "axios";
import * as CatApi from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA";

const selectInput = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');

if (selectInput.classList.contains('hidden')){
  selectInput.classList.remove('hidden');
}
loader.classList.add('hidden');
error.classList.add('hidden');

CatApi.fetchBreeds().then(response => {
  selectInput.insertAdjacentHTML(
    'beforeend',
    createSelectOptionsMarkup(response)
  )
}).catch((err) => {
  error.classList.remove('hidden');
  selectInput.classList.add('hidden');
  console.error(err);
});

selectInput.addEventListener('input', (evt) => {
  catInfo.innerHTML = '';

  loader.classList.remove('hidden');

  CatApi.fetchCatImgByBreed(evt.target.value).then(( data ) => {
    const elem = data.map(({ url }) => url);

    loader.classList.add('hidden');

    catInfo.insertAdjacentHTML(
      "afterbegin",
      createCatImageMarkup(elem.toString())
    );
  }).catch((err) => {
    error.classList.remove('hidden');
    selectInput.classList.add('hidden');
    console.error(err);
  });

  CatApi.fetchCatInfoByBreed(evt.target.value).then(data => {
    loader.classList.add('hidden');

    const elem = data
      .filter(({ id }) => id === evt.target.value)
      .map(({ name, description, temperament }) =>
        catInfo.insertAdjacentHTML(
          'beforeend',
          createCatTextMarkup(name, description, temperament)
        )
    );
  }).catch((err) => {
    error.classList.remove('hidden');
    selectInput.classList.add('hidden');
    console.error(err);
  });
});

function createSelectOptionsMarkup(arr) {
  return arr.map(({id, name}) => `
  <option value="${id}">${name}</option>
  `
  )
};

function createCatImageMarkup(url) {
  return `
  <img src=${url} alt="Cat Image">
  `
}

function createCatTextMarkup(name, desc, temperament) {
  return `
  <div>
    <h3>${name}</h3>
    <p>${desc}</p>
    <p><b>Temperament:</b> ${temperament}</p>
  </div>
  `
}