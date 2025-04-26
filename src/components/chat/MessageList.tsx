import { Message } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

interface MessageListProps {
    messages: Message[];
    loading?: boolean;
}

export default function MessageList({
    messages,
    loading = false,
}: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-primary-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">
                        مرحبًا بك في المساعد الذكي
                    </h3>
                    <p className="text-center max-w-md">
                        ابدأ محادثة جديدة وسأساعدك في الإجابة على أسئلتك وحل
                        مشكلاتك.
                    </p>
                </div>
            ) : (
                <>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                    {loading && (
                        <div className="flex justify-start my-4">
                            <div className="max-w-3xl rounded-2xl px-4 py-3 bg-white border border-gray-200">
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </>
            )}
        </div>
    );
}
