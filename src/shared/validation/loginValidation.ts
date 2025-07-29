import * as Yup from 'yup';
/* Схема валидации формы авторизации с пломощью Yup */
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .required('Email is required'),
    password: Yup.string()
        .min(5, 'Password must have at least 5 chars')
        .required('Password is required')
})

export default LoginSchema;