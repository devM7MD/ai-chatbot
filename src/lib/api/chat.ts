export async function sendMessageToAI(message: string): Promise<string> {
    try {
        const response = await fetch(`${process.env.AI_API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error("فشل الاتصال بالذكاء الاصطناعي");
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("خطأ في الاتصال بالذكاء الاصطناعي:", error);
        throw new Error("فشل الاتصال بالذكاء الاصطناعي");
    }
}
