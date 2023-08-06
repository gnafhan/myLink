import axios from "axios"

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

const api = axios.create({
    baseURL: `http://localhost:1337/api`,
    headers
})

export default api