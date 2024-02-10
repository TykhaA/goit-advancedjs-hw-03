import {fetchBreeds, fetchCatByBreed} from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const breedSelect = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

loader.classList.add('show');

iziToast.settings({
    timeout: 3000, 
    resetOnHover: true,
    position: 'topRight',
});

fetchBreeds()
    .then((response) => {
        const markUpOptions = response.data.map(({ id, name }) => {
            return `<option value="${id}" class="select-option">${name}</option>`
        }).join('');
        breedSelect.insertAdjacentHTML('afterbegin', markUpOptions);
        breedSelect.classList.add('show');
        new SlimSelect({
            select: '#selectElement',
            settings: {
            showSearch: false
  }
        })
    })
    .catch((err) => {
        iziToast.error({
            message: `Oops! Something went wrong! Try reloading the page!`,
          });    })
    .finally(() => {
         loader.classList.remove('show');
    })

breedSelect.addEventListener('change', chooseOption);
function chooseOption(evt) {
    catInfo.innerHTML = "";
    loader.classList.add('show');

    fetchCatByBreed(evt.currentTarget.value)
        .then((response) => {
            if (response.status === 200) {
                const markUpInfo = response.data.map(({ id, url, breeds : { 0: { name, description, temperament } } }) => {
               return `
                <img src="${url}" alt="${name}" width="300">
                <div class="info">
                    <h1 class="title">${name}</h1>
                    <p>${description}</p>
                    <p><span class="bold">Temperament:</span> ${temperament}</p>
                </div>`
                }).join('');
                catInfo.insertAdjacentHTML('afterbegin', markUpInfo);

            }else{
                 iziToast.error({
                    message: `Oops! Something went wrong! Try reloading the page!`,
                });
            }
        })
        .catch((err) => {
            iziToast.error({
                message: `Oops! Something went wrong! Try reloading the page!`,
            });
        })
        .finally(() => {
            loader.classList.remove('show');
        })
}

