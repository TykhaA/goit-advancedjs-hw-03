import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_RxSa29FSXKwnY7ki342LauoUMK8tdROEOV8MBhpvZ4uGpv1EzYPCX27rYs5AAJ9R';

function fetchBreeds() {
     return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    
}
export {fetchBreeds, fetchCatByBreed}