"use client";
import { useActionState } from "react";
import styles from "@/components/signup/signuppage.module.css";
import { useRouter } from "next/navigation";
import { signup } from "@/app/signup/actions";

const SignUp: React.FC = () => {
    const router = useRouter();
    const [state, action, pending] = useActionState(signup, {});

    return (
        <div className={styles.signupcard}>
            <div className={styles.cardheader}>
                <img 
                    src="/routing-images/left.png" 
                    alt="left arrow" 
                    className={styles.leftPng} 
                    onClick={() => router.back()} 
                />
                <h1>Sign up</h1>
            </div>
            <form action={action} className={styles.formcont}>
                <label htmlFor="">Username:
                    <input 
                        type="text"
                        name="username"
                    />
                </label>
                {state?.errors?.username && 
                    <p className={styles.errormessage}>{state.errors.username}</p>
                }
                <br />

                <label htmlFor="">Full name:
                    <input 
                        type="text" 
                        name="fullname"
                    />
                </label>
                {state?.errors?.fullname && 
                    <p className={styles.errormessage}>{state.errors.fullname}</p>
                }
                <br />

                <label htmlFor="">Email:
                    <input 
                        type="email"
                        name="email"
                    />
                </label>
                {state?.errors?.email && 
                    <p className={styles.errormessage}>{state.errors.email}</p>
                }
                <br />

                <label htmlFor="">Password:
                    <input 
                        type="password"
                        name="password"
                    />
                </label>
                {state?.errors?.password && 
                    <p className={styles.errormessage}>{state.errors.password}</p>
                }
                <br />

                <div className={styles.footercard}>
                    <button disabled={pending}>
                        {pending ? "Submitting..." : "Sign up"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;