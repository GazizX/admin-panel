import { Box, Button, Typography } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import styles from './SideBar.module.css'
export function Sidebar() {
    return(
        <Box 
            className={styles.sidebarContainer}
            width={100}
            display="flex" 
            justifyContent="center"
            alignItems="center"
            sx={{borderRight: "1px solid #673ab7"}}
        >
            <Button sx={{display: "flex", flexDirection: "column"}}>
                <Typography component="p" fontWeight="700" fontSize={25}>Add<br/>user</Typography>
                <PersonAddAltIcon fontSize="large"/>
            </Button>
        </Box>
    )
}