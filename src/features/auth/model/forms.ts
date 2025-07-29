import {createFormikSubmitEvent} from '../lib/loginSubmitting'
import { loginFx } from './auth';

/* Создание submit-функции для нашей формы */
export const loginFormSubmit = createFormikSubmitEvent(loginFx);