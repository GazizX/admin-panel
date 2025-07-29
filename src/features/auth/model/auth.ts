import Auth from "@entities/auth"
import { createEffect, createEvent, createStore, sample } from "effector"
import { getAuthUser, loginUser, logoutUser } from "../api/api"
import User from "@entities/user";

export const loginFx = createEffect<Auth, {message: string}, Error>(loginUser)
export const logoutFx = createEffect<void, { message: string }, Error>(logoutUser)
export const getAuthUserFx = createEffect<void, User, Error>(getAuthUser)

export const logout = createEvent()
export const appStarted = createEvent()

export const $user = createStore<User | null>(null)
    .on(getAuthUserFx.doneData, (_, user) => user)
    .reset(logoutFx.done, logoutFx.fail)

export const $isAuthenticated = $user.map(user => !!user)

export const $authError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error) => error.message)
  .on(getAuthUserFx.failData, (_, error) => {
    if (error.name === '401') return null;
    return error.message;
  })
  .reset(loginFx.done, loginFx.pending, getAuthUserFx.done, getAuthUserFx.pending);

sample({
  clock: loginFx.done,
  target: getAuthUserFx,
})

sample({
  clock: logout,
  target: logoutFx,
})

sample({
  clock: appStarted,
  target: getAuthUserFx,
});

