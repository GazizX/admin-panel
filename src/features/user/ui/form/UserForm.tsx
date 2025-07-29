import User from "@entities/user";
import { FormDataType, UserCreateFormData, UserUpdateFormData } from "@shared/interfaces/UserFormData";
import { Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Typography, TextField, FormControlLabel, Checkbox, Button, CircularProgress } from "@mui/material";
import UserSchema from "@shared/validation/formValidation";

interface UserFormProps {
    isCreating: boolean;
    initialData?: User | UserCreateFormData;
    onSubmit: (values: FormDataType, helpers: FormikHelpers<FormDataType>) => void | Promise<any>;
    isLoading?: boolean;
    error?: string | null;
}

export function UserForm({ isCreating, initialData, onSubmit, isLoading = false, error = null }: UserFormProps) {
    const formInitialValues: FormDataType = {
        name: initialData?.name || '',
        surName: initialData?.surName || '',
        email: initialData?.email || '',
        password: '',
        passwordConfirmation: '',
        birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : undefined,
        telephone: initialData?.telephone || '',
        employment: initialData?.employment || '',
        userAgreement: initialData?.userAgreement || false,
    } as FormDataType
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
                initialValues={formInitialValues}
                validationSchema={UserSchema}
                validationContext={{ isCreating: isCreating }}
                onSubmit={(values, helpers) => {
                    let submissionValues: UserCreateFormData | UserUpdateFormData;
                    if (!isCreating) {
                        // Для обновления: явно формируем объект типа UserUpdateFormData
                        submissionValues = {
                            name: values.name,
                            surName: values.surName,
                            fullName: `${values.name} ${values.surName}`,
                            birthDate: values.birthDate,
                            telephone: values.telephone,
                            employment: values.employment,
                            userAgreement: values.userAgreement,
                            // Email, password, passwordConfirmation здесь не включаем,
                            // так как бэкенд их не ожидает при PATCH
                        } as UserUpdateFormData; // Явное приведение к типу UserUpdateFormData
                    } else {
                        // Для создания: явно формируем объект типа UserCreateFormData
                        submissionValues = {
                            name: values.name,
                            surName: values.surName,
                            fullName: `${values.name} ${values.surName}`,
                            email: (values as UserCreateFormData).email, // Приведение
                            password: (values as UserCreateFormData).password, // Приведение
                            passwordConfirmation: (values as UserCreateFormData).passwordConfirmation, // Приведение
                            birthDate: values.birthDate,
                            telephone: values.telephone,
                            employment: values.employment,
                            userAgreement: values.userAgreement,
                        } as UserCreateFormData; // Явное приведение к типу UserCreateFormData
                    }
                    // Передаем очищенные значения в пропс onSubmit
                    onSubmit(submissionValues as FormDataType, helpers);
                }}
                enableReinitialize={true}
            >
                {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <Typography variant="h4" color="primary">
                            {isCreating ? 'Create user' : 'Edit user'}
                        </Typography>
                        <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={(e) => setFieldValue('name', e.target.value)}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Surname"
                            name="surName"
                            value={values.surName}
                            onChange={(e) => setFieldValue('surName', e.target.value)}
                            error={touched.surName && Boolean(errors.surName)}
                            helperText={touched.surName && errors.surName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Email"
                            name="email"
                            type="email"
                            value={(values as UserCreateFormData).email}
                            onChange={(e) => setFieldValue('email', e.target.value)}
                            error={(touched as FormikTouched<UserCreateFormData>).email && Boolean((errors as FormikErrors<UserCreateFormData>).email)}
                            helperText={(touched as FormikTouched<UserCreateFormData>).email && (errors as FormikErrors<UserCreateFormData>).email}
                            disabled={!isCreating}
                        />
                         {isCreating && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={(values as UserCreateFormData).password}
                                    onChange={(e) => setFieldValue('password', e.target.value)}
                                    // ИСПРАВЛЕНИЕ: Приведение типа для touched.password и errors.password
                                    error={(touched as FormikTouched<UserCreateFormData>).password && Boolean((errors as FormikErrors<UserCreateFormData>).password)}
                                    helperText={(touched as FormikTouched<UserCreateFormData>).password && (errors as FormikErrors<UserCreateFormData>).password}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Confirm password"
                                    name="passwordConfirmation"
                                    type="password"
                                    value={(values as UserCreateFormData).passwordConfirmation}
                                    onChange={(e) => setFieldValue('passwordConfirmation', e.target.value)}
                                    // ИСПРАВЛЕНИЕ: Приведение типа для touched.passwordConfirmation и errors.passwordConfirmation
                                    error={(touched as FormikTouched<UserCreateFormData>).passwordConfirmation && Boolean((errors as FormikErrors<UserCreateFormData>).passwordConfirmation)}
                                    helperText={(touched as FormikTouched<UserCreateFormData>).passwordConfirmation && (errors as FormikErrors<UserCreateFormData>).passwordConfirmation}
                                />
                            </>
                        )}


                        <DatePicker
                            label="Дата рождения"
                            value={values.birthDate || null}
                            onChange={(newValue) => {
                                setFieldValue('birthDate', newValue);
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: "normal",
                                    error: touched.birthDate && Boolean(errors.birthDate),
                                    helperText: touched.birthDate && errors.birthDate,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Phone number"
                            name="telephone"
                            value={values.telephone}
                            onChange={(e) => setFieldValue('telephone', e.target.value)}
                            error={touched.telephone && Boolean(errors.telephone)}
                            helperText={touched.telephone && errors.telephone}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Employment"
                            name="employment"
                            value={values.employment}
                            onChange={(e) => setFieldValue('employment', e.target.value)}
                            error={touched.employment && Boolean(errors.employment)}
                            helperText={touched.employment && errors.employment}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="userAgreement"
                                    checked={values.userAgreement}
                                    onChange={(e) => setFieldValue('userAgreement', e.target.checked)}
                                />
                            }
                            label="Accept user agreement"
                        />
                        {touched.userAgreement && errors.userAgreement && (
                            <Typography color="error" variant="caption" display="block">
                                {errors.userAgreement}
                            </Typography>
                        )}

                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting || isLoading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : (isCreating ? 'Create' : 'Save')}
                        </Button>
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    )
}