import Auth from "@entities/auth"
import User from "@entities/user";
import axios from "axios"

export const API_BASE_URL = 'https://forms-server-yfms.onrender.com'

export interface LoginSuccessResponse {
  message: string
}

export interface LogoutSuccessResponse {
  message: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

/* axios POST запрос на авторизацию */
export const loginUser = async (credentials: Auth): Promise<LoginSuccessResponse> => {
  const response = await api.post<LoginSuccessResponse>('api/v1/auth/login', credentials)
  return response.data
}
/* axios POST запрос на выход из системы*/
export const logoutUser = async (): Promise<LogoutSuccessResponse> => {
  const response = await api.post<LogoutSuccessResponse>('api/v1/auth/logout')
  return response.data
}
/* axios GET запрос на проверку авторизации*/
export const getAuthUser = async (): Promise<User> => {
  const response = await api.get<User>('api/v1/auth/me')
  console.log(response.data)
  return response.data;
}