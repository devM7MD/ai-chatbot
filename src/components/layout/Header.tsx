"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../ui/Button";

interface User {
    id: number;
    username: string;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        checkAuth();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-white">
                                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-primary-600">
                            المساعد الذكي
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        {user ? (
                            <>
                                <Link
                                    href="/chat"
                                    className={`px-3 py-2 rounded-md ${
                                        pathname === "/chat"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}>
                                    المحادثة
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={toggleMenu}
                                        className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-primary-600">
                                        <span>{user.username}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                تسجيل الخروج
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`px-3 py-2 rounded-md ${
                                        pathname === "/login"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}>
                                    تسجيل الدخول
                                </Link>
                                <Link href="/register">
                                    <Button>إنشاء حساب</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden" onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* قائمة الموبايل */}
                {isMenuOpen && (
                    <div className="mt-3 md:hidden">
                        {user ? (
                            <div className="space-y-2">
                                <div className="py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-800">
                                        {user.username}
                                    </span>
                                </div>
                                <Link
                                    href="/chat"
                                    className={`block px-3 py-2 rounded-md ${
                                        pathname === "/chat"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}>
                                    المحادثة
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-right px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    تسجيل الخروج
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    href="/login"
                                    className={`block px-3 py-2 rounded-md ${
                                        pathname === "/login"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}>
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    href="/register"
                                    className={`block px-3 py-2 rounded-md ${
                                        pathname === "/register"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}>
                                    إنشاء حساب
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
