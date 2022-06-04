import axios from 'axios';
//https://api.themoviedb.org/3/movie/550?api_key=109f9ff109b31c5dc7096437de77a6d5

const api = axios.create ({
    baseURL: "https://api.themoviedb.org/3"
});

export default api;