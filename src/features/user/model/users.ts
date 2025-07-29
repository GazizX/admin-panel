import User from "@entities/user";
import { createEffect, createEvent, createStore, sample } from "effector";
import { postUser, getUsers, deleteUser, patchUser, getUserById } from "@features/user/api";
import { UserCreateFormData } from "@shared/interfaces/UserFormData";

/* Эффекты для CRUD системы пользователей */
export const addUserFx = createEffect<UserCreateFormData, User>(postUser)
export const getUsersFx = createEffect(getUsers)
export const getUserByIdFx = createEffect(getUserById)
export const updateUserFx= createEffect(({ id, values }: { id: string; values: Partial<User> }) => patchUser(id, values))
export const deleteUserFx = createEffect(deleteUser)

export const userCreated = createEvent<User>()
export const userUpdated = createEvent<User>()
export const userDeleted = createEvent<string>()
/* Необходимо для перехода между страницами */
export const navigateTo = createEvent<string>()
export const selectUserForEdit = createEvent<string | null>()

/* Стор пользователей */
export const $users = createStore<User[]>([])
    .on(addUserFx.doneData, (users, user: User) => [...users, user])
    .on(getUsersFx.doneData, (_, users) => users)
    .on(updateUserFx.doneData, (users, updatedUser) =>
        users.map(user => (user.id === updatedUser.id ? updatedUser : user))
    )
    .on(deleteUserFx.doneData, (users, deletedUserId) =>
        users.filter(user => user.id !== deletedUserId)
    );

/* Стор идентификатора редактируемого пользователя */
export const $selectedUserId = createStore<string | null>(null)
  .on(selectUserForEdit, (_, id) => id)
  .reset(addUserFx.done);

/* Стор редактируемого пользователя */
export const $editingUser = createStore<User | null>(null)
  .on(getUserByIdFx.doneData, (_, user) => user)
  .on(selectUserForEdit, (_, id) => {
    if (id === null) return null
    const userFromStore = $users.getState().find(user => user.id === id)
    if (userFromStore && userFromStore.id === id) {
        return userFromStore
    }
    return null
  })
  .reset(updateUserFx.done, selectUserForEdit.filter({ fn: id => id === null }))


/* Создание связей событий (clock) и того, что необходимо выполнить (target) */
sample({
  clock: addUserFx.doneData,
  target: navigateTo.prepend(() => '/'),
});

sample({
  clock: updateUserFx.doneData,
  target: navigateTo.prepend(() => '/'),
});

sample({
  clock: deleteUserFx.doneData,
  target: userDeleted,
});