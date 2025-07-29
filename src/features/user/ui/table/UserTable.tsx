import { $users, getUsersFx, deleteUserFx } from "@features/user/model";
import { Delete, Edit } from "@mui/icons-material";
import { Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useUnit } from "effector-react";
import { useEffect } from "react";

export function UserTable() {
    const users = useUnit($users);
    const getUsers = useUnit(getUsersFx);
    const deleteUser = useUnit(deleteUserFx);
    const isLoading = useUnit(getUsersFx.pending);
    const isDeleting = useUnit(deleteUserFx.pending);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleDelete = (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        deleteUser(id);
        }
    };

    if (isLoading) {
        return <Typography sx={{padding: "50px 200px"}}variant="h3">Loading...</Typography>;
    }
  
    return(
        <Box sx={{padding: "50px 200px"}}>
        <Typography variant="h3" color="primary">Users</Typography>
        { users.length === 0 ? (
            <Typography component="p" color="primary">Not found. Try again.</Typography>
        ) : (
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>FullName</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(user.id)} disabled={isDeleting}><Delete/></Button>
                                <Button><Edit/></Button>
                            </TableCell>
                        </TableRow>
                    )
                    )}

                </TableBody>
                </Table>
            </TableContainer>
        )

        }
        </Box>
    )
}