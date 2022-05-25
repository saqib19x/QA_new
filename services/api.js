import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }
})

export const LoginMember = (data) => api.post('/lead/member-login/', data)

export default api