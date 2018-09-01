import axios from 'axios';

const instance = axios.create({
    baseURL:'https://score-app-b69dc.firebaseio.com/'
});

export default instance;