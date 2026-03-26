HireLens — AI Resume Analyzer

HireLens is a full-stack AI-powered resume analysis platform that evaluates resumes based on ATS (Applicant Tracking System) standards. It provides structured feedback including match score, strengths, weaknesses, and skill gaps tailored to specific job roles.

Live Links
Frontend: https://hirelens.vercel.app
Backend: https://hirelens-x9dq.onrender.com
API Base: https://hirelens-x9dq.onrender.com/api
Overview

The application enables users to upload resumes and receive instant analysis aligned with industry hiring standards. It integrates AI for intelligent feedback while ensuring system reliability through a fallback mechanism when AI responses are unavailable.

Features
ATS-based resume scoring
Role-specific analysis (Frontend, Backend, Data Science)
Strengths and weaknesses identification
Skill gap detection with recommendations
Resume upload and parsing (PDF support)
Analysis history tracking
AI-powered insights with fallback handling
Responsive and modern user interface
Tech Stack

Frontend

React (Vite)
Tailwind CSS
Axios

Backend

Node.js
Express.js
Multer (file upload handling)
PDF parsing utilities

AI Integration

Google Gemini API

Deployment

Vercel (Frontend)
Render (Backend)
Architecture

The project follows a modular client-server architecture:

Frontend handles UI, file uploads, and API communication
Backend processes resumes, extracts content, and generates analysis
AI service enhances insights with contextual understanding
Fallback logic ensures uninterrupted functionality in case of AI failure
Environment Configuration
Backend
PORT=5001
GEMINI_API_KEY=your_api_key
Frontend
VITE_API_URL=http://localhost:5001/api

Production:

VITE_API_URL=https://hirelens-x9dq.onrender.com/api
API Endpoints
POST /api/analyze
Upload and analyze resume
GET /api/history
Retrieve past analyses
Local Setup
Clone Repository
git clone https://github.com/NerajRuwali/HireLens.git
cd HireLens
Backend Setup
cd server
npm install
npm run dev
Frontend Setup
cd client
npm install
npm run dev
Deployment
Frontend deployed on Vercel
Backend deployed on Render
Environment variables configured separately for each environment
Key Highlights
Built a production-ready full-stack application with clean architecture
Integrated AI with a fallback mechanism for reliability
Handles real-time resume parsing and analysis
Designed for scalability and maintainability
Future Improvements
Retry mechanism for AI responses
Authentication and user accounts
Advanced scoring algorithms
Support for additional file formats
Author

Neeraj Ruwali
