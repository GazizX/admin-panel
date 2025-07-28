import { Auth } from "@entities"
import axios from "axios"

const API_BASE_URL = 'http://localhost:4000'

export const loginApi = {
    postLogin: (credentials: Auth) =>
        axios.post(`${API_BASE_URL}/api/v1/auth/login`, credentials)
}