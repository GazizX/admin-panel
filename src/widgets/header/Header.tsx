import { Box, Typography } from "@mui/material";
import style from './Header.module.css'
export function Header() {
    return(
        <Box className={style.headerContainer} sx={{borderBottom: "1px solid #673ab7"}}>
            <Typography variant="h2" component="h1" textAlign="center" color="primary">Home Page</Typography>
        </Box>
    )
}