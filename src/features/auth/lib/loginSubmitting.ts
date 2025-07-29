import { Auth } from "@entities";
import { FormikHelpers } from "formik";
import { loginFx } from "../model/auth";

const submitLogin = async (values: Auth, actions: FormikHelpers<Auth>) => {
    await loginFx(values);
    actions.setSubmitting(false);
}
export default submitLogin;