import User from "@entities/user/User";
import axios from "axios";
import { API_BASE_URL } from "@features/auth";
import { UserCreateFormData } from "@shared/interfaces/UserFormData";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const postUser = async (data: UserCreateFormData): Promise<User> => {
  const payload: Partial<UserCreateFormData> = { ...data };
  delete payload.passwordConfirmation;
  const response = await api.post<User>('api/v1/users', payload);
  return response.data;
};

export const getUsers = async(): Promise<User[]> => {
    const response = await api.get<User[]>('api/v1/users')
    return response.data
}

export const getUserById = async(id: string): Promise<User> => {
    const response = await api.get<User>(`api/v1/users/${id}`)
    return response.data
}

export const patchUser = async(id: string, data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`api/v1/users/${id}`, data)
    return response.data
}

export const deleteUser = async(id: string): Promise<string> => {
    await api.delete(`api/v1/users/${id}`)
    return id
}