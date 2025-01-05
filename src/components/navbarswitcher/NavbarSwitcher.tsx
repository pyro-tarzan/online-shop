"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../navbar/Navbar";
import { ProfileNavbar } from "../profilenavbar/ProfileNavbar";

export const NavbarSwitcher = () => {
    const router = usePathname();

    if ( router === "/profile" ) {
        return <ProfileNavbar />
    }
    return <Navbar />
};