import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10 text-white">
                            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                            <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        المساعد الذكي الخاص بك
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        تواصل مع الذكاء الاصطناعي المتطور للحصول على إجابات
                        وحلول لجميع استفساراتك.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/chat">
                            <Button size="lg">
                                بدء المحادثة
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2 rtl:rotate-180">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline" size="lg">
                                إنشاء حساب مجاني
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-primary-600">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            ذكاء اصطناعي متطور
                        </h3>
                        <p className="text-gray-600">
                            استفد من قوة الذكاء الاصطناعي المتطور للحصول على
                            إجابات دقيقة ومعلومات موثوقة.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-primary-600">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            محادثات طبيعية
                        </h3>
                        <p className="text-gray-600">
                            تفاعل مع المساعد الذكي بشكل طبيعي وسلس كأنك تتحدث مع
                            خبير حقيقي.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-primary-600">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            خصوصية وأمان
                        </h3>
                        <p className="text-gray-600">
                            نحن نضمن أمان بياناتك وخصوصية محادثاتك مع المساعد
                            الذكي.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
