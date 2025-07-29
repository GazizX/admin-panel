import Auth from "@entities/auth";
import { FormikHelpers } from "formik";
import { loginFx } from "../model/auth";
import { Effect } from "effector";

const submitLogin = async (values: Auth, actions: FormikHelpers<Auth>) => {
    await loginFx(values);
    actions.setSubmitting(false);
}
export default submitLogin;

export const createFormikSubmitEvent = <Values, Done, Fail>(
  effect: Effect<Values, Done, Fail>
) => {
  return async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    try {
      await effect(values);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
};