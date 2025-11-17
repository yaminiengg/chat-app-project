📌 Chat Application — React + Node.js (Mock Backend)

A simplified ChatGPT-style application built using:

Frontend: React (JavaScript), CSS

Backend: Node.js, Express

No Database: All data comes from mock JSON

This project demonstrates sessions, chat interactions, structured (tabular) responses, and theme management.

✨ Features
🔹 Frontend (React + CSS)

Landing page with New Chat

Collapsible Sidebar showing all chat sessions

Chat interface with:

User input

Bot response

Table view for structured data

Like 👍 / Dislike 👎 feedback buttons

Dark/Light Theme toggle (global)

Responsive design (Mobile + Desktop)

Session-based routing using URL (/chat/:sessionId)

🔹 Backend (Node.js + Express)

Mock data API (no database)

Endpoints:

/api/new-chat → returns new session ID

/api/sessions → returns all sessions

/api/session/:id → returns session history

/api/chat/:id → returns mock table + answer

In-memory session history

Simple title generation

📁 Folder Structure
/chat-app-project
|
├── /backend
|   ├── server.js
|   ├── mockData.js
|   ├── package.json
|
└── /frontend
    ├── package.json
    ├── /src
        ├── index.js
        ├── index.css
        ├── App.js
        ├── /components
            ├── Sidebar.js
            ├── ThemeToggle.js
            ├── ChatInput.js
            ├── TableResponse.js
            ├── AnswerFeedback.js

🚀 How to Run the Backend
Install dependencies
cd backend
npm install

Start the server
npm start


Backend runs on:

http://localhost:5000

🚀 How to Run the Frontend
Install dependencies
cd frontend
npm install

Start React app
npm start


Frontend runs on:

http://localhost:3000

🔗 API Endpoints
➤ Create new chat
GET /api/new-chat

➤ Get all sessions
GET /api/sessions

➤ Get session history
GET /api/session/:id

➤ Ask question
POST /api/chat/:id
Body: { "question": "Your text" }

🧪 Demo Flow

Open the React app

Click New Chat

Backend creates a new session ID

Type a question

Backend returns:

Answer text

Table data

UI displays the structured response

User can like/dislike

Sidebar shows all sessions

📦 Deployment (Optional)

You can deploy:

Frontend: Netlify / Vercel

Backend: Render / Railway / Cyclic

👤 Author

Yamini
