import {createFormikSubmitEvent} from '../lib/loginSubmitting'
import { loginFx } from './auth';

export const loginFormSubmit = createFormikSubmitEvent(loginFx);