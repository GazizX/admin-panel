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
/* POST запрос для создания юзера*/
export const postUser = async (data: UserCreateFormData): Promise<User> => {
  const payload: Partial<UserCreateFormData> = { ...data };
  delete payload.passwordConfirmation;
  const response = await api.post<User>('api/v1/users', payload);
  return response.data;
};
/* GET запрос для получения списка юзеров*/
export const getUsers = async(): Promise<User[]> => {
    const response = await api.get<User[]>('api/v1/users')
    return response.data
}
/* GET запрос для получения юзера по id*/
export const getUserById = async(id: string): Promise<User> => {
    const response = await api.get<User>(`api/v1/users/${id}`)
    return response.data
}
/* PATCH запрос для редактирования данных юзера*/
export const patchUser = async(id: string, data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`api/v1/users/${id}`, data)
    return response.data
}
/* DELETE запрос для удаления юзера*/
export const deleteUser = async(id: string): Promise<string> => {
    await api.delete(`api/v1/users/${id}`)
    return id
}