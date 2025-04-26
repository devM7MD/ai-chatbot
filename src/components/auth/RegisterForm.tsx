"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { RegisterData } from "@/types/auth";

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<RegisterData>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء إنشاء الحساب");
            }

            router.push("/login?registered=true");
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                إنشاء حساب جديد
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Input
                        label="اسم المستخدم"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="أدخل اسم المستخدم"
                        required
                    />

                    <Input
                        label="البريد الإلكتروني"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                    />

                    <Input
                        label="كلمة المرور"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="أدخل كلمة المرور"
                        required
                        minLength={6}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}>
                        إنشاء حساب
                    </Button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm">
                لديك حساب بالفعل؟{" "}
                <Link
                    href="/login"
                    className="text-primary-600 hover:text-primary-500">
                    تسجيل الدخول
                </Link>
            </div>
        </div>
    );
}
