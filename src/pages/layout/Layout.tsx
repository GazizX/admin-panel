import {Header} from "@widgets/header";
import {Sidebar} from "@widgets/sidebar";
import { Outlet } from "react-router";

/* Layout, который виден на всех страницах после авторизации */
export function Layout() {
    return(
        <>
        <Header/>
        <Sidebar/>
        {/* Необходимо для вложенного роутинга */}
        <Outlet />
        </>
    )
}