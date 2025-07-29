import { Box, Button, Typography } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import styles from './SideBar.module.css'
import { useNavigate } from "react-router";
export function Sidebar() {
    const navigate = useNavigate()
    /* переход на страницу формы создания пользователя */
    const handleAdd = () => {
        navigate('/user/create')
    }
    return(
        <Box 
            className={styles.sidebarContainer}
            width={100}
            display="flex" 
            justifyContent="center"
            alignItems="center"
            sx={{borderRight: "1px solid #673ab7"}}
        >
            <Button sx={{display: "flex", flexDirection: "column"}} onClick={() => handleAdd()}>
                <Typography component="p" fontWeight="700" fontSize={25}>Add<br/>user</Typography>
                <PersonAddAltIcon fontSize="large"/>
            </Button>
        </Box>
    )
}