"use client";
import styles from "@/components/signin/siginpage.module.css";
import { useState, FormEvent } from "react";
import { FieldErrors, FormDataTypes, FormState } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { SignInFormSchema } from "@/app/lib/definitions";

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState<FormState>({});
    const router = useRouter();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // PERFORM ACTION TO SUBMIT TO BACKEND VIA API REQUEST.
        const form = event.currentTarget;
        const formData = new FormData(form);
        const formValues: FormDataTypes = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        const result = SignInFormSchema.safeParse(formValues);
        if ( !result.success ) {
            const validateErrors: FieldErrors = result.error.flatten().fieldErrors;
            setErrorMessage({errors: validateErrors});
            return;
        }

        try{
            const res = await fetch("/apis/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            });

            const data = await res.json();
            if ( data.status == 200 ) {
                form.reset();
                router.push(`/profile/${data.user_id}`);
            } else {
                setErrorMessage({message: data.message || "Signin failed."});
            }

        } catch ( error ) {
            console.log("SignIn: ", error);
            setErrorMessage({message: "Can't connect to the server."})
        }
    }

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
            <form onSubmit={handleSubmit} className={styles.formcont}>
                <label htmlFor="">Email:
                    <input 
                        type="email"
                        name="email"
                    />
                </label>
                {errorMessage?.errors?.email && <p>{errorMessage.errors.email}</p>}
                <br />

                <label htmlFor="">Password:
                    <input 
                        type="password"
                        name="password"
                    />
                </label>
                {errorMessage?.errors?.email && <p>{errorMessage.errors.password}</p>}
                <br />

                <div className={styles.footercard}>
                    <button type="submit">SignIn</button>
                    {errorMessage?.message && 
                        <p className={styles.errormessage}>{errorMessage.message}</p>
                    }
                </div>
            </form>
        </div>
    )
};

export default SignIn;