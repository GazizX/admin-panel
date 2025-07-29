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

export interface UserUpdateFormData {
    name?: string;
    surName?: string;
    birthDate?: Date;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}

export type FormDataType = UserCreateFormData | UserUpdateFormData;