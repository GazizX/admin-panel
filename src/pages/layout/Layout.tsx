import { Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function Layout() {
    return(
        <>
        <Typography>Hello World</Typography>
        <Outlet />
        </>
    )
}