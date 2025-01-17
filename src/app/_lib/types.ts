export interface FormData {
    get(name: string): string | null;
}

export interface ValidationError {
    [key: string]: string[];
}