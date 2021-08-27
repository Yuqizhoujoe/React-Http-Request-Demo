import axios from "axios";

const axios = axios.create({
    baseURL: 'https://swapi.dev/api/'
});

export default axios;
