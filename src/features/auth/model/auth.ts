import { Auth } from "@entities"
import { createEffect, createEvent, createStore } from "effector"
import { loginApi } from "../api/api"

export const loginFx = createEffect(async (credentials: Auth) => {
    const response = await loginApi.postLogin(credentials)
    return response.data
})

export const loginSuccess = createEvent<any>()
export const loginFail = createEvent<string>()
export const logout = createEvent()

export const $token = createStore<boolean>(false)
    .on(loginFx.doneData, () => {
        console.log("Login successful, token set via cookie");
        return true
    })
    .reset(logout)

export const $error = createStore<string | null>(null)
    .on(loginFx.failData, (_ , error) => (error as any).message || 'Auth error')
    .reset(loginFx) 

export const $isLoading = createStore<boolean>(false)
    .on(loginFx.pending, (_ , $isLoading) => $isLoading)