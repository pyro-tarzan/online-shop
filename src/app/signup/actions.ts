"use server";

import { query } from "../_lib/db";
import { SignUpFormSchema } from "../_lib/definitions";
import { storeHash } from "../_lib/encryption";
import { createSession } from "../_lib/session";
import { FormData, ValidationError } from "../_lib/types";

export async function signup(state: any, formData: FormData): Promise<{ errors?: ValidationError }> {
    const validationResult = SignUpFormSchema.safeParse({
        username: formData.get("username"),
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password")
    });

    if( !validationResult.success ) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const {username, fullname, email, password} = validationResult.data;

    const users = await query("SELECT email FROM users WHERE email = $1;", [email]);
    const user = users.rows;

    if ( user.length > 0) {
        return {
            errors: { email: ["Email is already existed."] }
        };
    } else {
        const hashedPassword = await storeHash(password, 10);
        
        const result = await query("INSERT INTO users(username, full_name, email, password) \
            VALUES($1, $2, $3, $4) RETURNING user_id;", [username, fullname, email, hashedPassword]);
        
        const user = result.rows[0];
        await createSession(user.user_id);
        return {};
    }
}