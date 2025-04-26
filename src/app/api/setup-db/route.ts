import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db/migrations/setup";

export async function GET(request: NextRequest) {
    try {
        const result = await setupDatabase();

        if (result) {
            return NextResponse.json({
                success: true,
                message: "تم إعداد قاعدة البيانات بنجاح",
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "فشل إعداد قاعدة البيانات",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("خطأ في إعداد قاعدة البيانات:", error);
        return NextResponse.json(
            {
                success: false,
                message: "حدث خطأ أثناء إعداد قاعدة البيانات",
            },
            { status: 500 }
        );
    }
}
