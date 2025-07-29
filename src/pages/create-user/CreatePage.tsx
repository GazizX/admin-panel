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
            // В режиме создания `values` всегда будет соответствовать `UserCreateFormData`.
            // Приводим тип для соответствия ожидаемому аргументу `addUserFx`.
            await addUserFx(values as UserCreateFormData);
        } catch (error) {
            console.error('Ошибка создания пользователя:', error);
            // Устанавливаем статус ошибки в Formik.
            // Это может быть общая ошибка формы или специфичные ошибки полей.
            helpers.setStatus({ message: (error as any)?.message || 'Произошла ошибка при создании пользователя.' });
        } finally {
            helpers.setSubmitting(false); // Всегда сбрасываем состояние отправки Formik
        }
    };

    const initialFormValues: UserCreateFormData = {
        name: '',
        surName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        birthDate: undefined, // undefined для опциональных полей (или null, если DatePicker так ожидает)
        telephone: '',
        employment: '',
        userAgreement: false,
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
            <UserForm
                isCreating={true} // Указываем, что это режим создания
                initialData={initialFormValues} // Передаем пустые начальные значения
                onSubmit={handleSubmitCreate} // Передаем обработчик отправки формы
                isLoading={isAddingUser} // Передаем состояние загрузки в форму
            />
            {isAddingUser && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}