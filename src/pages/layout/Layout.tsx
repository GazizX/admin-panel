import { Typography } from "@mui/material";
import {Header} from "@widgets";
import {Sidebar} from "@widgets";
import { Outlet } from "react-router";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Layout() {
    return(
        <>
        <AdminPanelSettingsIcon color="primary" sx={{position: "absolute", top: 18, left: 18, fontSize: "70px"}}/>
        <Header/>
        <Sidebar/>
        <Outlet />
        </>
    )
}