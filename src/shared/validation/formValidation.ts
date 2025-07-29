import * as yup from 'yup';
/* Схема валидации формы редактирования/создания пользователя с помощь Yup*/
const UserSchema = yup.object().shape({
    name: yup.string()
        .required('Имя обязательно')
        .max(64, 'Имя не должно превышать 64 символа'),

    surName: yup.string()
        .required('Фамилия обязательна')
        .max(64, 'Фамилия не должна превышать 64 символа'),

    email: yup.string().when('isCreating', {
        is: true,
        then: (schema) => schema
            .email('Неверный формат email')
            .required('Email обязателен'),
    }),

    password: yup.string().when('isCreating', {
        is: true,
        then: (schema) => schema
            .required('Пароль обязателен')
            .min(5, 'Пароль должен быть не менее 5 символов'),
        otherwise: (schema) => schema.notRequired()
    }),
    passwordConfirmation: yup.string().when('isCreating', {
        is: true,
        then: (schema) => schema
            .required('Подтверждение пароля обязательно')
            .oneOf([yup.ref('password')], 'Пароли не совпадают'),
        otherwise: (schema) => schema.notRequired()
    }),

    birthDate: yup.date()
        .nullable()
        .notRequired()
        .max(new Date(), 'Дата рождения не может быть в будущем')
        .typeError('Неверный формат даты рождения'),

    telephone: yup.string()
        .nullable()
        .notRequired()
        .matches(/^\+?[0-9\s-()]{7,20}$/, 'Неверный формат номера телефона'),

    employment: yup.string()
        .nullable()
        .notRequired(),

    userAgreement: yup.boolean()
        .oneOf([true], 'Необходимо принять пользовательское соглашение'),
});

export default UserSchema;