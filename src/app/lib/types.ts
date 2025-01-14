export interface FormDataTypes {
    username?: string;
    email: string;
    password: string;
    fullname?: string;
}

export type FormState = | {
    errors?: FieldErrors;
    message?: string;
} | undefined

export type FieldErrors = {
    username?: string[];
    fullname?: string[];
    email?: string[];
    password?: string[];
}