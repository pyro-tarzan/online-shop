"use client";
import styles from "@/components/signin/siginpage.module.css";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "@/app/signin/actions";

const SignIn: React.FC = () => {
    const router = useRouter();
    const [state, action, pending] = useActionState(signin, {});

    return (
        <div className={styles.signincard}>
            <div className={styles.cardheader}>
                <img 
                    src="/routing-images/left.png" 
                    alt="left arrow" 
                    className={styles.leftPng} 
                    onClick={() => router.back()} 
                />
                <h1>Sign in</h1>
            </div>
            <form action={action} className={styles.formcont}>
                <label htmlFor="">Email:
                    <input 
                        type="email"
                        name="email"
                    />
                </label>
                {state?.errors?.email && 
                    <p className={styles.errormessage}>{state.errors?.email}</p>
                }
                <br />

                <label htmlFor="">Password:
                    <input 
                        type="password"
                        name="password"
                    />
                </label>
                {state?.errors?.password &&
                    <p className={styles.errormessage}>{state.errors?.password}</p>
                }
                <br />

                <div className={styles.footercard}>
                    <button disabled={pending}>
                        { pending ? "Submitting..." : "Sign in" }
                    </button>
                </div>
            </form>
        </div>
    )
};

export default SignIn;