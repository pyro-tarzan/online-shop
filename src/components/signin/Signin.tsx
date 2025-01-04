"use client";
import styles from "@/components/signin/siginpage.module.css";
import { useState } from "react";
import { FormData } from "@/app/lib/types";
import { validateForm } from "@/app/lib/validationform";

export const SignIn = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        // PERFORM ACTION TO SUBMIT TO BACKEND VIA API REQUEST.

        const validateErrors = validateForm(formData);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
        } else {
            try{
                const res = await fetch("/apis/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();
                console.log(data.message);
            } catch ( error ) {
                console.log(error);
            }
    
            setFormData({
                email: "",
                password: ""
            });
        }
    }
    return (
        <div className={styles.signincard}>
            <div>
                <h1>Sign in</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.formcont}>
                <label htmlFor="">Email:
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label htmlFor="">Password:
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">SignIn</button>
            </form>
        </div>
    )
}