import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from '@shared/validation';
import Auth from "@entities/auth";
import { FormControl, Input, InputLabel, Typography, Button, CircularProgress } from "@mui/material";
import styles from "./LoginForm.module.css"
import { loginFx, $authError, $isAuthenticated, loginFormSubmit } from "@features/auth/model";
import { useUnit } from 'effector-react';
import { useEffect } from "react";
import { useNavigate } from "react-router";

/* Начальное значение формы */
const initialValues: Auth = { email: '', password: '' }
/* Форма авторизации */
export function LoginForm() {
    /* Данные от Effector */
    const isLoading = useUnit(loginFx.pending)
    const authError = useUnit($authError)
    const isAuthenticated = useUnit($isAuthenticated)

    /* Логика перехода при авторизации */
    const navigate = useNavigate()
    useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

    return(
        <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}   
        onSubmit={loginFormSubmit}>
            {({errors, touched, isSubmitting}) => (
                <Form className={styles.formContainer}>
                    <Typography variant="h4" component="h1" textAlign="center" color="primary">Log In</Typography>
                    <FormControl>
                        <InputLabel htmlFor="emailInput" margin="dense">Email</InputLabel>
                        <Field
                            as={Input}
                            id="emailInput"
                            name="email"
                            placeholder="example@gmail.com"
                            error={touched.email && Boolean(errors.email)}
                            inputProps={{ 'aria-label': 'email' }}
                        />
                        <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="passwordInput">Password</InputLabel>
                        <Field
                            as={Input}
                            id="passwordInput"
                            name="password"
                            type="password"
                            placeholder="qwerty1234"
                            error={touched.password && Boolean(errors.password)}
                            inputProps={{ 'aria-label': 'password' }}
                        />
                        <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                    </FormControl>
                    {authError && <Typography color="error" className={styles.errorMessage}>{authError}</Typography>}
                    <Button variant="outlined" disabled={isSubmitting || isLoading} type="submit">
                        {isLoading ? <CircularProgress size={24} /> : 'SUBMIT'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}