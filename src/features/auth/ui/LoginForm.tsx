import { Formik, Form, Field, ErrorMessage } from "formik";
import submitLogin from "../lib/loginSubmitting";
import LoginSchema from "@shared";
import { Auth } from "@entities";
import { FormControl, Input, InputLabel, Typography, Button, CircularProgress } from "@mui/material";
import styles from "./LoginForm.module.css"
import { $error, $isLoading } from "../model/auth";
import { useUnit } from 'effector-react';

const initialValues: Auth = { email: '', password: '' }

export function LoginForm() {
    const isLoading = useUnit($isLoading);
    const error = useUnit($error);
    return(
        <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}   
        onSubmit={submitLogin}>
            {({errors, touched}) => (
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
                    {error && <Typography color="error" className={styles.errorMessage}>{error}</Typography>}
                    <Button variant="outlined" disabled={isLoading} type="submit">
                        {isLoading ? <CircularProgress size={24} /> : 'SUBMIT'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}