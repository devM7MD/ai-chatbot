import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
    const user = getCurrentUser();

    if (!user) {
        return NextResponse.json(
            { success: false, message: "غير مصرح" },
            { status: 401 }
        );
    }

    return NextResponse.json({
        success: true,
        user,
    });
}
