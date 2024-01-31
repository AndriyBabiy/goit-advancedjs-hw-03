import SlimSelect from "slim-select";
import "slim-select/styles";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA";

import * as CatApi from "./cat-api";

const selectInput = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');

hide(error);
hide(selectInput);
hide(catInfo);

CatApi.fetchBreeds().then(response => {
  hide(loader);
  show(selectInput);

  new SlimSelect({
    select: selectInput,
    data: slimSelectData(response),

    events: {
      afterChange: (newVal) => {
        const value = newVal.map(({ value }) => value);
        getCat(value);
      }
    }
  });
}).catch((err) => {
  displayError(err)
});

function getCat(evt) {
  catInfo.innerHTML = ''

  show(loader);

  CatApi.fetchCatByBreed(evt).then(( data ) => {
    const url = data.map(({ url }) => url).toString();
    const name = data.map(elem => elem.breeds).flat().map(({ name }) => name).toString();
    const description = data.map(elem => elem.breeds).flat().map(({ description }) => description).toString();
    const temperament = data.map(elem => elem.breeds).flat().map(({ temperament }) => temperament).toString();

    if (data.length === 0) {
      throw new Error("Cat not found")
    }

    catInfo.insertAdjacentHTML(
      "afterbegin",
      createCatMarkup(url, name, description, temperament)
    );

    hide(loader);
    show(catInfo);

  }).catch((err) => {
    displayError(err);
  });
};

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function displayError(err) {
  iziToastPopup(err)
  hide(loader);
  hide(selectInput);
  hide(document.querySelector('.ss-main'));
  console.error(err);
}

function iziToastPopup(text) {
  return iziToast.show({
    title: `${text}`,
    message: 'Oops! Something went wrong! Try reloading the page!',
    color: 'red',
    position: 'topRight',
    timeout: false,
  })
}

function slimSelectData(arr) {
  return arr.map(({id, name}) => (
    {text: name, value: id}
  )
  )
};

function createCatMarkup(url, name, desc, temperament) {
  return `
  <img class='cat-img' src=${url} alt="Cat Image">
  <div class="cat-text">
    <h3>${name}</h3>
    <p>${desc}</p>
    <p><b>Temperament:</b> ${temperament}</p>
  </div>
  `
}