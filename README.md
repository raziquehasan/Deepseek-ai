DeepSeek AI

DeepSeek AI is an open-source, full-stack AI chatbot application that leverages Google's Gemini API for intelligent conversations. It features a modern React frontend with real-time interactions, a Node.js backend with JWT authentication, and MongoDB for persistent storage.

🚀 Features

Real-time Chat Interface: Built with React, offering a responsive and interactive user experience.

Markdown & Syntax Highlighting: Supports Markdown rendering and code syntax highlighting using React Markdown and Prism.js.

File Uploads: Allows users to upload text files for AI processing.

User Authentication: Secure login and token-based authentication with JWT.

Persistent Chat History: Stores user conversations in MongoDB for continuity.

CORS & Cookie Support: Configured for local development with CORS and cookie handling.

🛠️ Technologies

Frontend: React, Tailwind CSS, React Markdown, Prism.js

Backend: Node.js, Express, Multer, JWT, Google Gemini API

Database: MongoDB

Authentication: JWT with user middleware

Development Tools: Nodemon, Axios

📁 Project Structure
DeepSeek-AI/
├── backend/
│   ├── controller/
│   │   └── prompt.controller.js
│   ├── middleware/
│   │   └── prompt.middleware.js
│   ├── model/
│   │   └── prompt.model.js
│   ├── route/
│   │   └── prompt.route.js
│   ├── index.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Prompt.jsx
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── logo.png
    ├── .env
    └── package.json

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/raziquehasan/Deepseek-ai.git
cd Deepseek-ai

2. Backend Setup

Navigate to the backend directory.

Install dependencies:

npm install


Create a .env file with the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key


Start the backend server:

npm run dev

3. Frontend Setup

Navigate to the frontend directory.

Install dependencies:

npm install


Create a .env file with the following variable:

VITE_API_URL=http://localhost:4002/api/v1


Start the frontend development server:

npm run dev


Access the application at http://localhost:5173.

🧪 Testing the Application

Open the frontend in your browser.

Log in with your credentials.

Upload a text file or type a message in the chat interface.

Observe real-time responses from the AI assistant.

🛠️ Development Tips

Nodemon: Automatically restarts the backend server on code changes.

React Fast Refresh: Enables fast refresh for the frontend during development.

Tailwind CSS: Utilize utility-first classes for rapid UI development.

📄 License

This project is licensed under the MIT License.

📬 Contact

For issues or contributions, please refer to the GitHub Issues page.
