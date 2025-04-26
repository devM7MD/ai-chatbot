import ChatInterface from "@/components/chat/ChatInterface";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default function ChatPage() {
    const user = getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="h-[calc(100vh-140px)]">
            <ChatInterface />
        </div>
    );
}
