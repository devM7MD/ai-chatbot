export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-600 text-sm">
                            &copy; {new Date().getFullYear()} المساعد الذكي -
                            جميع الحقوق محفوظة
                        </p>
                    </div>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-primary-500 text-sm">
                            الشروط والأحكام
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-primary-500 text-sm">
                            سياسة الخصوصية
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-primary-500 text-sm">
                            اتصل بنا
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
