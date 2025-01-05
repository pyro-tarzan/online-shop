"use client";
import styles from "@/components/signup/signuppage.module.css";
import { useState } from "react";
import { FormData } from "@/app/lib/types";
import { validateForm } from "@/app/lib/validationform";

export const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        fullname: "",
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

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try{
                const res = await fetch("/apis/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();
                console.log(data);
            } catch ( error ) {
                console.log(error);
            }

            setFormData({
                username: "",
                fullname: "",
                email: "",
                password: ""
            });
            console.log("Form submitted.");
        }    
    }
    return (
        <div className={styles.signupcard}>
            <div>
                <h1>Sign up</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.formcont}>
                <label htmlFor="">Username:
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label htmlFor="">Full name:
                    <input 
                        type="text" 
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                </label>
                <br />
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
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}