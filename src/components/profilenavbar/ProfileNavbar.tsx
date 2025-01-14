"use client";
import styles from "@/components/profilenavbar/profilenavbar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ProfileNavbar = ({userData}: any) => {
    const [accountClicked, setAccountClicked] = useState<Boolean>(false);
    const router = useRouter();

    const onclickAccount = () => {
        setAccountClicked(!accountClicked);
    };

    const handleLogout = async() => {
        try{
            const res = await fetch("/apis/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });

            const result = await res.json();
            if ( result.status === 200 ) {
                router.push("/signin");
            }
        } catch (error) {
            console.log("Profile Navbar: ", error);
        }
    };

    return (
        <div className={styles.navbar}>
            <header>
                <nav>
                    <span>Online Shop</span>
                    <div className={styles.navmenus}>
                        <div className={styles.cart}>
                            <p className={styles.pmenus}>Cart</p>
                        </div>
                        <div className={styles.account}>
                            <p onClick={onclickAccount} className={`${styles.pmenus}`}>Account</p>
                            {accountClicked ? 
                                <div className={styles.accountdropdown}>
                                    <div className={styles.imagecont}>
                                        <div className={styles.imagecircle}></div>
                                        <p>{userData.full_name}</p>
                                    </div>
                                    <div className={styles.options}>
                                        <p className={styles.poptions}>Settings</p>
                                        <p onClick={handleLogout} className={styles.poptions}>Logout</p>
                                    </div>
                                </div> : null
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}