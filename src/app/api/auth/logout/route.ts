import { NextResponse } from "next/server";
import { clearLoginCookie } from "@/lib/auth/session";

export async function POST() {
    clearLoginCookie();

    return NextResponse.json({
        success: true,
        message: "تم تسجيل الخروج بنجاح",
    });
}
