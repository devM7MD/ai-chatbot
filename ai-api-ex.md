# API الذكاء الاصطناعي البسيط

هذا مثال بسيط لكيفية إنشاء API محلي للذكاء الاصطناعي باستخدام Python وFastAPI.

## الخطوات

1. قم بإنشاء مجلد جديد:

```bash
mkdir ai-api
cd ai-api
```

2. قم بإنشاء بيئة افتراضية وتفعيلها:

```bash
python -m venv venv
source venv/bin/activate  # على Linux/Mac
# أو
venv\Scripts\activate  # على Windows
```

3. قم بتثبيت الاعتماديات:

```bash
pip install fastapi uvicorn python-dotenv openai langchain
```

4. قم بإنشاء ملف `.env`:

```
OPENAI_API_KEY=your_openai_api_key_here
```

5. قم بإنشاء ملف `main.py`:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import openai

# تحميل المتغيرات البيئية
load_dotenv()

# الحصول على مفتاح API الخاص بـ OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="AI Chat API")

# إعداد CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "مرحبًا بك في API الذكاء الاصطناعي"}

@app.post("/chat")
async def chat(chat_message: ChatMessage):
    try:
        # استخدام OpenAI للحصول على إجابة
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "أنت مساعد ذكي مفيد ومتخصص يتحدث باللغة العربية."},
                {"role": "user", "content": chat_message.message}
            ],
            max_tokens=500,
            temperature=0.7,
        )
        
        # استخراج الإجابة من استجابة OpenAI
        ai_response = response.choices[0].message.content
        
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# بديل بسيط بدون الحاجة إلى مفتاح OpenAI API
# اختياري: إذا لم يكن لديك مفتاح OpenAI API
@app.post("/chat-simple")
async def chat_simple(chat_message: ChatMessage):
    # هذه وظيفة بسيطة للرد بدون الاتصال بـ OpenAI
    message = chat_message.message.lower()
    
    if "مرحبا" in message or "أهلا" in message:
        return {"response": "أهلاً بك! كيف يمكنني مساعدتك اليوم؟"}
    elif "كيف حالك" in message:
        return {"response": "أنا بخير، شكراً للسؤال! كيف يمكنني مساعدتك؟"}
    elif "من أنت" in message:
        return {"response": "أنا المساعد الذكي الخاص بك، تم تطويري للإجابة على أسئلتك ومساعدتك في المهام المختلفة."}
    elif "وداعا" in message or "مع السلامة" in message:
        return {"response": "مع السلامة! أتمنى أن أكون قد ساعدتك. عد في أي وقت إذا احتجت للمساعدة!"}
    else:
        return {"response": "شكراً لرسالتك! أعمل حالياً على تحسين قدراتي للإجابة على مختلف الأسئلة. هل يمكنني مساعدتك في شيء آخر؟"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

6. قم بتشغيل الخادم:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

ملاحظة: إذا لم يكن لديك مفتاح API الخاص بـ OpenAI، يمكنك استخدام النقطة النهائية `/chat-simple` بدلاً من `/chat` في التطبيق الرئيسي. قم بتعديل الملف `src/lib/api/chat.ts` لاستخدام المسار المناسب.

## اختبار API

يمكنك اختبار API باستخدام curl:

```bash
curl -X POST "http://localhost:8000/chat" -H "Content-Type: application/json" -d '{"message":"مرحبا"}'
```

أو باستخدام `/chat-simple` للنسخة البسيطة:

```bash
curl -X POST "http://localhost:8000/chat-simple" -H "Content-Type: application/json" -d '{"message":"مرحبا"}'
```

## استخدام LangChain (بديل متقدم)

إذا كنت تريد استخدام LangChain بدلاً من OpenAI مباشرة:

```python
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# إعداد LangChain
template = """
أنت مساعد ذكي مفيد باللغة العربية. أجب على السؤال التالي بأكبر قدر ممكن من المساعدة:

سؤال: {question}

إجابة:
"""

prompt = PromptTemplate(template=template, input_variables=["question"])
llm = OpenAI(temperature=0.7)
chain = LLMChain(llm=llm, prompt=prompt)

@app.post("/chat-langchain")
async def chat_langchain(chat_message: ChatMessage):
    try:
        response = chain.run(question=chat_message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## ملاحظة هامة

تأكد من تعديل ملف `src/lib/api/chat.ts` في التطبيق الرئيسي ليتناسب مع API الخاص بك إذا قمت بتغيير المسارات أو طريقة الاستجابة.