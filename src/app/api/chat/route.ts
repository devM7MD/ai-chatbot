import { NextRequest, NextResponse } from "next/server";
import { sendMessageToAI } from "@/lib/api/chat";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
    try {
        const user = getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { success: false, message: "غير مصرح" },
                { status: 401 }
            );
        }

        const { message, conversationId } = await request.json();

        if (!message) {
            return NextResponse.json(
                { success: false, message: "الرسالة مطلوبة" },
                { status: 400 }
            );
        }

        let activeConversationId = conversationId;

        // If no chat is selected, create a new chat.
        if (!activeConversationId) {
            const newConversation = await db
                .insert(conversations)
                .values({
                    userId: user.id,
                    title:
                        message.slice(0, 50) +
                        (message.length > 50 ? "..." : ""),
                    createdAt: new Date().toISOString(),
                })
                .returning({
                    id: conversations.id,
                });

            activeConversationId = newConversation[0].id;
        }

        // Saving user message in the database
        await db.insert(messages).values({
            conversationId: activeConversationId,
            content: message,
            role: "user",
            createdAt: new Date().toISOString(),
        });

        // Send the message to the api
        const aiResponse = await sendMessageToAI(message);

        // Save the answer in the database
        await db.insert(messages).values({
            conversationId: activeConversationId,
            content: aiResponse,
            role: "assistant",
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            response: aiResponse,
            conversationId: activeConversationId,
        });
    } catch (error) {
        console.error("خطأ في معالجة المحادثة:", error);
        return NextResponse.json(
            { success: false, message: "حدث خطأ أثناء معالجة الرسالة" },
            { status: 500 }
        );
    }
}
