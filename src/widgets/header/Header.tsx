import { Box, Button, Typography } from "@mui/material";
import style from './Header.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useUnit } from "effector-react";
import { logoutFx } from "@features/auth/model";
export function Header() {
    const logout = useUnit(logoutFx)
    /* Обработка выхода из учетной записи */
    const handleLogout = () => {
        logout()
    }
    return (
        <Box className={style.headerContainer} 
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={
                { 
                    borderBottom: "1px solid #673ab7" }
                }>
            <AdminPanelSettingsIcon color="primary" sx={{fontSize: "70px"}}/>
            <Typography variant="h2" component="h1" textAlign="center" color="primary">Admin Panel</Typography>
            <Button onClick={handleLogout}><LogoutIcon sx={{fontSize: "50px"}}/></Button>
        </Box>
    );
}