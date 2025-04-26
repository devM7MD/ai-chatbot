"use client";

import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Welcome message when start chatting ;-)
    useEffect(() => {
        const welcomeMessage: Message = {
            role: "assistant",
            content:
                "مرحبًا! أنا المساعد الذكي الخاص بك. كيف يمكنني مساعدتك اليوم؟",
        };
        setMessages([welcomeMessage]);
    }, []);

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = { role: "user", content };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء معالجة الرسالة");
            }

            const assistantMessage: Message = {
                role: "assistant",
                content: data.response,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("خطأ في المحادثة:", error);
            const errorMessage: Message = {
                role: "assistant",
                content:
                    "عذرًا، حدث خطأ أثناء معالجة رسالتك. يرجى المحاولة مرة أخرى.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <MessageList messages={messages} loading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
    );
}
