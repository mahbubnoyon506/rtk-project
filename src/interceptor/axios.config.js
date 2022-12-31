import axios from "axios";
let URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'DEVELOPMENT':
        URL = 'http://localhost:8000/'
        break;
    case 'PRODUCTION':
        URL = 'http://localhost:8000/'
        break;
    default:
        URL = 'http://localhost:8000/'
}

const instance = axios.create({
    baseURL: URL,
})

export default instance;