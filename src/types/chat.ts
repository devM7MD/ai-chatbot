export interface Message {
    id?: number;
    content: string;
    role: "user" | "assistant";
    createdAt?: string;
}

export interface Conversation {
    id: number;
    title: string;
    userId: number;
    createdAt: string;
    messages?: Message[];
}

export interface ChatResponse {
    success: boolean;
    message?: string;
    response?: string;
}
