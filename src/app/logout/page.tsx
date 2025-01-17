import styles from "@/app/logout/logoutpage.module.css";

// IMPORT COMPONENTS
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import WhiteButton from "@/components/Button/Button";

export default async function LogoutPage() {
    return (
        <div className={styles.logoutpage}>
            <HomeNavbar />
            <div className={styles.logoutcomponent}>
                <div className={styles.loggedout}>
                    <h1 className={styles.logh1}>Logged out successfully</h1>
                    <div className={styles.logoutbuttons}>
                        <WhiteButton urlLink="/" urlName="Go to Home Page" />
                        <WhiteButton urlLink="/signin" urlName="Go to SignIn" />
                    </div>
                </div>
            </div>
        </div>
    )
}