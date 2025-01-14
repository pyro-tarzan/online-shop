import styles from "@/app/signup/signup.module.css";

// IMPORT COMPONENTS
import SignUp from "@/components/signup/Signup";

export default function SignUpPage() {
    return (
        <div className={styles.signuppage}>
            <div className={styles.signupsection}>
                <div className={styles.signupcont}>
                    <SignUp />
                </div>
            </div>
        </div>
    )
}