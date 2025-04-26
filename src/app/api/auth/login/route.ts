import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { setLoginCookie } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // information checking
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "البريد الإلكتروني وكلمة المرور مطلوبان",
                },
                { status: 400 }
            );
        }

        // check if user found
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (user.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
                },
                { status: 401 }
            );
        }

        // password checking
        const isPasswordValid = await verifyPassword(
            password,
            user[0].passwordHash
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
                },
                { status: 401 }
            );
        }

        // Create and assign cookies token
        const sessionUser = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
        };

        const token = setLoginCookie(sessionUser);

        return NextResponse.json({
            success: true,
            message: "تم تسجيل الدخول بنجاح",
            user: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email,
            },
            token,
        });
    } catch (error) {
        console.error("خطأ في تسجيل الدخول:", error);
        return NextResponse.json(
            { success: false, message: "حدث خطأ أثناء تسجيل الدخول" },
            { status: 500 }
        );
    }
}
