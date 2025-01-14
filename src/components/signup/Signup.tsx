"use client";
import { FormEvent, useState } from "react";
import styles from "@/components/signup/signuppage.module.css";
import { useRouter } from "next/navigation";
import { FormDataTypes, FormState, FieldErrors } from "@/app/lib/types";
import { SignUpFormSchema } from "@/app/lib/definitions";

const SignUp = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<FormState>({});

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const formValues: FormDataTypes = {
            username: formData.get("username") as string,
            fullname: formData.get("fullname") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const result = SignUpFormSchema.safeParse(formValues);
        if ( !result.success ) {
            const validateErrors: FieldErrors = result.error.flatten().fieldErrors;
            setErrorMessage({errors: validateErrors});
            return;
        }
        setErrorMessage({});

        try{
            const res = await fetch("/apis/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formValues)
            });

            const data = await res.json();
            if ( data.status === 200 ) {
                form.reset();
                router.push(`/profile/${data.user_id}`);
            } else {
                setErrorMessage({message: data.message || "Signup failed."});
            }
            
        } catch(error) {
            console.error("Signup Error: ", error);
            setErrorMessage({message: "Can't connect to the server."});
        }
    }

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
            <form onSubmit={handleSubmit} className={styles.formcont}>
                <label htmlFor="">Username:
                    <input 
                        type="text"
                        name="username"
                    />
                </label>
                {errorMessage?.errors?.username && <p>{errorMessage.errors.username}</p>}
                <br />

                <label htmlFor="">Full name:
                    <input 
                        type="text" 
                        name="fullname"
                    />
                </label>
                {errorMessage?.errors?.fullname && <p>{errorMessage.errors.fullname}</p>}
                <br />

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
                {errorMessage?.errors?.password && <p>{errorMessage.errors.password}</p>}
                <br />

                <div className={styles.footercard}>
                    <button type="submit">SignUp</button>
                    {errorMessage?.message && 
                        <p className={styles.errormessage}>{errorMessage.message}</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default SignUp;