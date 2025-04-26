import RegisterForm from "@/components/auth/RegisterForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/session";

export default function RegisterPage() {
    // Login Checking
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        const user = verifyToken(token);
        if (user) {
            redirect("/chat");
        }
    }

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
}
