/* DTO для POST запроса */
export interface UserCreateFormData {
    name: string;
    surName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    birthDate?: Date;
    telephone?: string;
    employment?: string;
    userAgreement: boolean;
}
/* DTO для PATCH запроса */
export interface UserUpdateFormData {
    name?: string;
    surName?: string;
    birthDate?: Date;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}

/* Тип для универсальной формы UserForm.tsx */
export type FormDataType = UserCreateFormData | UserUpdateFormData;