export interface User {
    name: string,
    surName: string,
    password: string,
    fullName: string,
    email: string,
    birthDate?: Date,
    telephone?: string,
    employment?: string,
    userAgreement: boolean
}