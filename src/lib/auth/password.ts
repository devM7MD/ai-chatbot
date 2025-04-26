import bcrypt from "bcrypt";

// Password Hashing - for security perposes -_-
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Password Check 0_0
export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
