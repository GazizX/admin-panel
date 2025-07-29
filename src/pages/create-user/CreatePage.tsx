import { UserForm } from "@features/user";
import { addUserFx } from "@features/user/model";
import { Box, CircularProgress } from "@mui/material";
import { FormDataType, UserCreateFormData } from "@shared/interfaces/UserFormData";
import { useUnit } from "effector-react";
import { FormikHelpers } from "formik";

export function CreatePage() {
    const isAddingUser = useUnit(addUserFx.pending)

    const handleSubmitCreate = async (values: FormDataType, helpers: FormikHelpers<FormDataType>) => {
        try {
            await addUserFx(values as UserCreateFormData);
        } catch (error) {
            console.error('Ошибка создания пользователя:', error);
        } finally {
            /* Сбрасываем состояние Formik*/
            helpers.setSubmitting(false);
        }
    };

    /* Начальное (пустое) значение формы */
    const initialFormValues: UserCreateFormData = {
        name: '',
        surName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        birthDate: undefined,
        telephone: '',
        employment: '',
        userAgreement: false,
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
            <UserForm
                isCreating={true}
                initialData={initialFormValues}
                onSubmit={handleSubmitCreate}
                isLoading={isAddingUser}
            />
            {isAddingUser && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}