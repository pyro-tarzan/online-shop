import styles from "@/app/signin/signin.module.css";
import { SignIn } from "@/components/signin/Signin";

export default function SignInPage() {
    return (
        <div className={styles.signinpage}>
            <div className={styles.signinsection}>
                <div className={styles.signincont}>
                    <SignIn />
                </div>
            </div>
        </div>
    )
}