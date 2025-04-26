import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        // information checking..
        if (!username || !email || !password) {
            return NextResponse.json(
                { success: false, message: "جميع الحقول مطلوبة" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
                },
                { status: 400 }
            );
        }

        // checking if user found
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { success: false, message: "البريد الإلكتروني مستخدم بالفعل" },
                { status: 400 }
            );
        }

        // Password hashing
        const passwordHash = await hashPassword(password);

        // Create new user
        const newUser = await db
            .insert(users)
            .values({
                username,
                email,
                passwordHash,
                createdAt: new Date().toISOString(),
            })
            .returning({
                id: users.id,
                username: users.username,
                email: users.email,
                createdAt: users.createdAt,
            });

        return NextResponse.json(
            {
                success: true,
                message: "تم إنشاء الحساب بنجاح",
                user: newUser[0],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("خطأ في تسجيل المستخدم:", error);
        return NextResponse.json(
            { success: false, message: "حدث خطأ أثناء إنشاء الحساب" },
            { status: 500 }
        );
    }
}
