"use server";

import { query } from "../_lib/db";
import { SignInFormSchema } from "../_lib/definitions";
import { verifyHash } from "../_lib/encryption";
import { createSession } from "../_lib/session";
import { FormData, ValidationError } from "../_lib/types";

export async function signin (state: any, formData: FormData): Promise<{ errors?: ValidationError }> {
    const validateResult = SignInFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });

    if ( !validateResult.success ) {
        return {
            errors: validateResult.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateResult.data;

    const result = await query("SELECT user_id, email, password FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if ( !user ) {
        return {
            errors: {
                email: ["No account found with this email."]
            }
        };
    }

    // Check authentication
    const verifyPassword = await verifyHash(password, user.password);
    if ( email === user.email && verifyPassword) {
        await createSession(user.user_id);
    } else {
        return {
            errors: { password: ["Invalid username or password"] }
        };
    }

    return {}
}