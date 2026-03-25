import express from "express";
import multer from "multer";
import { parseResumeBuffer } from "../utils/pdf.js";
import { analyzeResumeWithAI } from "../services/ai.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const upload = multer();

const ROLE_SKILLS = {
  "Frontend Developer": ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Vite", "Tailwind", "Redux", "Framer Motion", "Next.js"],
  "Backend Developer": ["Node.js", "Express", "MongoDB", "SQL", "PostgreSQL", "Python", "Java", "Docker", "AWS", "Redis", "GraphQL"],
  "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Tableau"]
};

let analysisHistory = [];

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    // STEP 3: Debug logs
    console.log("API HIT");
    console.log("File:", req.file?.originalname);
    console.log("Buffer exists:", !!req.file?.buffer);

    // STEP 2: Validate file input
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // STEP 4: Fix PDF parsing — isolated try-catch
    let resumeText = "";
    try {
      resumeText = await parseResumeBuffer(req.file.buffer);
    } catch (err) {
      console.error("PDF ERROR:", err);
      return res.status(500).json({ error: "PDF parsing failed" });
    }

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({ error: "Empty resume content" });
    }

    const { role = "Frontend Developer" } = req.body;
    const requiredSkills = ROLE_SKILLS[role] || ROLE_SKILLS["Frontend Developer"];
    const matchedSkills = requiredSkills.filter(skill => resumeText.toLowerCase().includes(skill.toLowerCase()));
    const keywordScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);

    // STEP 5: Fix Gemini API call — isolated try-catch with fallback
    let aiAnalysis = null;
    try {
      aiAnalysis = await analyzeResumeWithAI(resumeText.substring(0, 10000), role);
      console.log("Gemini raw:", JSON.stringify(aiAnalysis));
    } catch (err) {
      console.error("GEMINI ERROR:", err.message);
      // Use fallback instead of returning 500
      aiAnalysis = {
        ai_score: 60,
        strengths: ["Resume uploaded successfully"],
        weaknesses: ["AI analysis temporarily unavailable — quota may be exceeded"],
        suggestions: ["Please try again in a minute or check your Gemini API key"],
        missing_skills: []
      };
    }

    // STEP 6: Fix JSON parsing — safe fallback if AI returned bad data
    let parsed;
    try {
      if (!aiAnalysis || typeof aiAnalysis !== "object") {
        throw new Error("AI returned non-object response");
      }
      parsed = aiAnalysis;
    } catch (err) {
      console.error("JSON PARSE ERROR:", aiAnalysis);
      parsed = {
        ai_score: 60,
        strengths: ["Fallback: basic analysis"],
        weaknesses: ["AI parsing failed"],
        suggestions: ["Try again"],
        missing_skills: []
      };
    }

    // STEP 7: Always return safe response
    const finalResult = {
      score: Math.round((0.5 * (parsed.ai_score || 60)) + (0.5 * keywordScore)),
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || [],
      missing_skills: parsed.missing_skills || [],
      keyword_score: keywordScore,
      role,
      timestamp: new Date().toISOString()
    };

    analysisHistory.unshift(finalResult);
    if (analysisHistory.length > 20) analysisHistory.pop();

    return res.json(finalResult);

  } catch (error) {
    // STEP 1: Outer try-catch catches anything unexpected
    console.error("SERVER ERROR:", error);

    const logPath = path.join(process.cwd(), "error.log");
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logPath, `[${timestamp}] Route /analyze failed: ${error.message}\n`);

    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

router.get("/history", (req, res) => {
  res.json(analysisHistory);
});

export default router;
