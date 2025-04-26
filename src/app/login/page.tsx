import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/session";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { registered?: string };
}) {
    // Login Checking
    const cookieStore = cookies();
    const token = (async function () {
        return await cookieStore.get("token")?.value
    });

    if (token) {
        const user = verifyToken(token);
        if (user) {
            redirect("/chat");
        }
    }

    const registered = searchParams.registered === "true";

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {registered && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.
                    </div>
                )}
                <LoginForm />
            </div>
        </div>
    );
}
