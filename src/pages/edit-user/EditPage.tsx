import { UserForm } from "@features/user";
import { $editingUser, getUserByIdFx, updateUserFx, $users } from "@features/user/model";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FormDataType } from "@shared/interfaces/UserFormData";
import { useUnit } from "effector-react";
import { FormikHelpers } from "formik";
import { useEffect } from "react";
import { useParams} from "react-router";


export function EditPage() {
    const { id } = useParams<{ id: string }>();

    const editingUser = useUnit($editingUser);
    const isLoadingUser = useUnit(getUserByIdFx.pending);
    const isUpdating = useUnit(updateUserFx.pending);

    const loadUser = useUnit(getUserByIdFx);
    const selectUser = useUnit($users.map(users => users.find(u => u.id === id)));

    useEffect(() => {
        if (id) {
            if (selectUser) {
                if (!editingUser || editingUser.id !== id) {
                    loadUser(id);
                }
            } else {
                loadUser(id);
            }
        }
    }, [id, loadUser, selectUser, editingUser]);

    const handleUpdateSubmit = async (values: FormDataType, helpers: FormikHelpers<FormDataType>) => {
        if (id) {
            try {
                await updateUserFx({ id, values });
            } catch (error) {
                console.error('Update failed:', error);
            } finally {
                helpers.setSubmitting(false);
            }
        } else {
            console.error('User ID is missing for update operation.');
            helpers.setSubmitting(false);
        }
    }

    if (isLoadingUser) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!editingUser || editingUser.id !== id) {
        
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <UserForm
                isCreating={false}
                initialData={editingUser}
                onSubmit={handleUpdateSubmit}
                isLoading={isUpdating}
            />
        </Box>
    );
};