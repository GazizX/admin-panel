import {Header} from "@widgets/header";
import {Sidebar} from "@widgets/sidebar";
import { Outlet } from "react-router";

export function Layout() {
    return(
        <>
        <Header/>
        <Sidebar/>
        <Outlet />
        </>
    )
}