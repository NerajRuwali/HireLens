# 📄 AI Resume Analyzer

## 🔗 Live Links
- **🌐 Frontend:** [https://hire-lens-livid.vercel.app](https://hire-lens-livid.vercel.app)
- **⚙️ Backend:** [https://hirelens-x9dq.onrender.com](https://hirelens-x9dq.onrender.com)
- **📡 API Base:** `https://hirelens-x9dq.onrender.com/api`

## 📌 Overview
An intelligent, full-stack application that analyzes resumes (PDFs), extracts key information, and provides AI-driven insights, scoring, and actionable feedback to help candidates improve their chances of landing their dream job.

## 🌟 Key Features

- **Smart PDF Parsing:** Seamlessly extracts and processes text from uploaded PDF resumes.
- **AI-Powered Analysis:** Leverages Google Gemini and OpenAI to deeply analyze resume content, identify gaps, and suggest improvements.
- **Interactive Analytics Dashboard:** Beautifully visualizes resume metrics, skill distribution, and ATS scoring using interactive charts.
- **Actionable Feedback:** Generates bulleted, actionable insights tailored to the specific resume.
- **Export Reports:** Allows users to download their AI-generated resume report as a formatted PDF.
- **Modern & Responsive UI:** Designed with a premium, glassmorphism aesthetic, featuring smooth micro-animations.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Routing:** React Router DOM
- **Utilities:** `html2pdf.js`, `lucide-react`, `react-icons`

### Backend
- **Framework:** Node.js + Express
- **AI Integration:** `@google/generative-ai` (Gemini), `openai`
- **File Handling:** Multer
- **PDF Processing:** `pdf-parse`
- **Security & Utils:** CORS, JSON Web Tokens (JWT), Dotenv

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You will also need API keys for Google Gemini and/or OpenAI.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Setup the Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your API keys:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
# Add any other required environment variables
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd client
npm install
```
Start the development server:
```bash
npm run dev
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is licensed under the MIT License.
