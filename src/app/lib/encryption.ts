import bcrypt from "bcryptjs";

export const storeHash = async(password:string, salt:number) => {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

export const verifyHash = async(currentPassword: string, storedPassword: string) => {
    try{
        const result = bcrypt.compare(currentPassword, storedPassword);
        return result;
    } catch(error) {
        console.log("Encryption error:", error);
        return false;
    }
}