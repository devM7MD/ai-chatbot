import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_this";

export interface SessionUser {
    id: number;
    username: string;
    email: string;
}

// Creating JWT
export function createToken(user: SessionUser): string {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}

// Checking JWT
export function verifyToken(token: string): SessionUser | null {
    try {
        return jwt.verify(token, JWT_SECRET) as SessionUser;
    } catch (error) {
        return null;
    }
}

// Getting the current user from cookies
export function getCurrentUser(): SessionUser | null {
    const cookieStore = cookies();
    const token = (async function () {
        return await cookieStore.get("token")?.value
    });

    if (!token) return null;

    return verifyToken(token);
}

// Login and assign the user in cookies
export function setLoginCookie(user: SessionUser) {
    const token = createToken(user);
    cookies().set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
    return token;
}

// logout and delete cookies
export function clearLoginCookie() {
    cookies().delete("token");
}
