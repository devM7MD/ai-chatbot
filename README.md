# Smart Assistant - AI Conversational App

This project is an AI conversational app similar to Claude, allowing users to interact with its AI API. It is built using Next.js, TypeScript, and Tailwind CSS, and includes an authentication system using SQLite3.

## Key Features

- Chat interface with a Claude-like design
- Full authentication system (login, signup, signout)
- Connect to your AI API
- Store conversations and messages in an SQLite database
- Responsive design with blue colors inspired by the Next.js documentation
- Full Arabic language support

## System Requirements

- Node.js v18 or later
- NPM v9 or later
- Local AI API (on localhost)

## Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/devM7MD/ai-chatbot.git
cd ai-chat-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and set environment variables:

```
# variables Environment
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=./sqlite.db
API_URL=http://localhost:3000/api
AI_API_URL=http://localhost:8000
```

4. Create the database:

```bash
# Start the server first
npm run dev

# In another window, configure the database
curl http://localhost:3000/api/setup-db
```

Or you can visit the following link in your browser:
`http://localhost:3000/api/setup-db`

5. Run the application in development mode:

```bash
npm run dev
```

6. Open your browser at the following link: [http://localhost:3000](http://localhost:3000)

## API setup Artificial Intelligence

This project assumes that you have an AI API service running on http://localhost:8000. This service must accept POST requests with the following parameters:

```json
{
"message": "User message here"
}
```

It must respond in JSON format containing a "response" field:

```json
{
"response": "AI response here"
}
```

You can modify the connection to your API in the file `src/lib/api/chat.ts`.

## Project Structure

```
ai-chatbot/
├── src/ # App Source
│ ├── app/ # App Paths and Pages
│ ├── components/ # User Interface Components
│ ├── lib/ # Helper Libraries and Services
│ │ ├── db/ # Database Functions
│ │ ├── api/ # API Connections
│ │ └── auth/ # Authentication Logic
│ └── types/ # TypeScript Definitions
├── public/ # Public Files
└── ...
```

## Customization

- You can modify the colors in the `tailwind.config.js`
- To modify the welcome text, edit `src/components/chat/ChatInterface.tsx`
- To modify the logo and design, edit the layout components in `src/components/layout/`

## Production

To build the application for production:

```bash
npm run build
```

To start the built version:

```bash
npm start
```

## License

This project is licensed under the [MIT License](LICENSE).
