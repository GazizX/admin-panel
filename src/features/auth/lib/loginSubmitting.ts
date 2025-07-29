import { FormikHelpers } from "formik";
import { Effect } from "effector";

/* Фабрика для создания submit-функции для Formik*/
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