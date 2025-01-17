"use client";
import styles from "@/components/profilenavbar/profilenavbar.module.css";
import { logout } from "@/app/_actions/logout";
import { useState } from "react";

export const ProfileNavbar = ({userData}: any) => {
    const [accountClicked, setAccountClicked] = useState<Boolean>(false);

    const onclickAccount = () => {
        setAccountClicked(!accountClicked);
    };

    const handleLogout = async() => {
        await logout();
    };

    return (
        <div className={styles.navbar}>
            <header>
                <nav>
                    <span>Online Shop</span>
                    <div className={styles.navmenus}>
                        <div className={styles.menus}>
                            <p className={styles.pmenus}>Cart</p>
                        </div>
                        <div className={styles.menus}>
                            <p onClick={onclickAccount} className={`${styles.pmenus}`}>Account</p>
                            {accountClicked ? 
                                <div className={styles.accountdropdown}>
                                    <div className={styles.imagecont}>
                                        <div className={styles.imagecircle}>
                                            <p className={styles.startletter}>{userData.full_name[0]}</p>
                                        </div>
                                        <p>{userData.full_name}</p>
                                    </div>
                                    <div className={styles.options}>
                                        <p className={styles.poptions}>Settings</p>
                                        <p 
                                            onClick={handleLogout}
                                            className={styles.poptions}
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div> : null
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}