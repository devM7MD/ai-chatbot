import { Message } from "@/types/chat";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const [isTyping, setIsTyping] = useState(false);
    const [displayText, setDisplayText] = useState("");

    // Writing Effect ;D
    useEffect(() => {
        if (message.role === "assistant") {
            setIsTyping(true);
            setDisplayText("");

            const text = message.content;
            let currentIndex = 0;

            const typingInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText((prevText) => prevText + text[currentIndex]);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                }
            }, 10); // Writing Speed...

            return () => clearInterval(typingInterval);
        } else {
            setDisplayText(message.content);
        }
    }, [message]);

    const isAssistant = message.role === "assistant";

    return (
        <div
            className={`flex my-4 ${
                isAssistant ? "justify-start" : "justify-end"
            }`}>
            <div
                className={`max-w-3xl rounded-2xl px-4 py-3 ${
                    isAssistant
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-primary-500 text-white"
                }`}>
                {isAssistant ? (
                    <div>
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-primary-700">
                                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                                </svg>
                            </div>
                            <span className="font-medium text-primary-600">
                                المساعد
                            </span>
                        </div>
                        <div className="prose prose-blue">
                            <ReactMarkdown>{displayText}</ReactMarkdown>
                            {isTyping && (
                                <span className="inline-block w-2 h-4 bg-primary-500 animate-pulse"></span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center mb-2 justify-end">
                            <span className="font-medium text-white">أنت</span>
                            <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-white">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="whitespace-pre-wrap">{displayText}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
