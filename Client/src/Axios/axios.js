import axios from "axios";

const baseUrl = 'http://localhost:9000/api'

const instance = axios.create({
    baseURL:baseUrl,
})

export default instance