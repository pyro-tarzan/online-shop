import styles from "@/components/profilenavbar/profilenavbar.module.css";
import { useState } from "react";

export const ProfileNavbar = () => {
    const [accountClicked, setAccountClicked] = useState<Boolean>(false);

    const onclickAccount = () => {
        setAccountClicked(!accountClicked);
    }

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
                                        <p>Name</p>
                                    </div>
                                    <div className={styles.options}>
                                        <p className={styles.poptions}>Settings</p>
                                        <p className={styles.poptions}>Logout</p>
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