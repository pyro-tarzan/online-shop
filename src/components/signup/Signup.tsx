"use client";
import styles from "@/components/signup/signuppage.module.css";
import { useState, useEffect } from "react";

interface FormData {
    username: string;
    email: string;
    password: string;
}

export const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // PERFORM ACTION TO SUBMIT TO BACKEND VIA API REQUEST.

        setFormData({
            username: "",
            email: "",
            password: ""
        });
        console.log("Form submitted.")
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