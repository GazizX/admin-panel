import Auth from "@entities/auth"
import User from "@entities/user";
import axios from "axios"

export const API_BASE_URL = 'http://localhost:4000'

export interface LoginSuccessResponse {
  message: string;
}

export interface LogoutSuccessResponse {
  message: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const loginUser = async (credentials: Auth): Promise<LoginSuccessResponse> => {
  const response = await api.post<LoginSuccessResponse>('api/v1/auth/login', credentials);
  return response.data;
};



export const logoutUser = async (): Promise<LogoutSuccessResponse> => {
  const response = await api.post<LogoutSuccessResponse>('api/v1/auth/logout');
  return response.data;
};

export const getAuthUser = async (): Promise<User> => {
  const response = await api.get<User>('api/v1/auth/me');
  console.log(response.data)
  return response.data;
};