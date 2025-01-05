import { FormData } from "./types";

const isValidEmail = (email: string) => {
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    return emailRegex.test(email);
};

export const validateForm = (formData: FormData) => {
    const errors:any = {};

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
        errors.email = "Invalid email address";
    }

    if (formData.password.length < 8) {
        errors.password = "Password must be atleast 8 characters long";
    } else if (formData.password.length > 30) {
        errors.password = "Password can't exceed 30 characters";
    }

    if (!formData.username?.trim()) {
        errors.username = "Username is required"
    }

    if (!formData.fullname?.trim()) {
        errors.fullname = "Your name is required"
    }

    return errors;
}