import axios from "axios";

// base url of tmdb
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

// appends /foo-bar where needed.
// instance.get('/foo-bar');
export default instance;
