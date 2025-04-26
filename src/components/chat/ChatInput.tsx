import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Button from "../ui/Button";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({
    onSendMessage,
    disabled = false,
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Changing height textarea automatically ;D
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-2 rtl:space-x-reverse">
                <div className="flex-1 bg-gray-100 rounded-lg border border-gray-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                    <textarea
                        ref={textareaRef}
                        className="w-full bg-transparent p-3 focus:outline-none resize-none max-h-32"
                        placeholder="اكتب رسالتك هنا..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={disabled}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className="h-10 w-10 !p-0 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 transform -rotate-90">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                </Button>
            </div>
        </form>
    );
}
