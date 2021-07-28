import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://poke-builder-87324-default-rtdb.firebaseio.com/'
});

export default instance;
