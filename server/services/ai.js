import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const MAX_RETRIES = 2;
const API_TIMEOUT_MS = 30000; // 30 second timeout

const FALLBACK_ANALYSIS = {
  ai_score: 60,
  strengths: [
    "Resume structure detected",
    "Content parsed successfully"
  ],
  weaknesses: [
    "AI analysis temporarily unavailable",
    "Using basic keyword-based analysis instead"
  ],
  suggestions: [
    "AI response temporarily unavailable",
    "Using basic analysis instead",
    "Try again for detailed insights"
  ],
  missing_skills: []
};

const logError = (error, context = "") => {
  const logPath = path.join(process.cwd(), "error.log");
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${context}\n${error.stack || error}\n\n`;
  fs.appendFileSync(logPath, logMessage);
};

// Timeout wrapper — rejects if API takes too long
const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`API call timed out after ${ms}ms`)), ms)
    )
  ]);
};

// Clean markdown/code fences from AI response
const cleanJsonText = (text) => {
  if (!text) return "";
  return text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
};

// Safely parse JSON from AI text
const safeParseJSON = (rawText) => {
  const cleanText = cleanJsonText(rawText);
  const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON object found in AI response");
  }
  return JSON.parse(jsonMatch[0]);
};

export const analyzeResumeWithAI = async (text, role) => {
  // STEP 3: Improved prompt — strict JSON instruction at the end
  const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer.
Analyze the following resume for the role of "${role}".

Respond with a JSON object matching this EXACT schema:
{
  "ai_score": <number between 0-100>,
  "strengths": [<string>, ...],
  "weaknesses": [<string>, ...],
  "suggestions": [<string>, ...],
  "missing_skills": [<string>, ...]
}

Resume Content:
${text}

Return ONLY valid JSON. No explanation. No markdown.`;

  // STEP 1: Retry logic — try API call up to MAX_RETRIES times
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[Gemini] Attempt ${attempt}/${MAX_RETRIES} for role: ${role}`);

      // STEP 4: Timeout safety — abort if API hangs
      const result = await withTimeout(
        model.generateContent(prompt),
        API_TIMEOUT_MS
      );

      const response = await result.response;
      const rawText = response.text();

      console.log(`[Gemini] Raw response (attempt ${attempt}):`, rawText);

      if (!rawText || !rawText.trim()) {
        throw new Error("Empty response from Gemini API");
      }

      // STEP 5: Safe JSON parsing — ensures valid structured output
      try {
        const parsed = safeParseJSON(rawText);

        // Normalize and validate the parsed response
        return {
          ai_score: typeof parsed.ai_score === "number"
            ? Math.max(0, Math.min(100, parsed.ai_score))
            : 60,
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
          missing_skills: Array.isArray(parsed.missing_skills) ? parsed.missing_skills : []
        };
      } catch (parseError) {
        console.error(`[Gemini] JSON parse failed (attempt ${attempt}):`, rawText);
        logError(parseError, `JSON parse failed on attempt ${attempt}: ${rawText}`);
        lastError = parseError;
        // Continue to next retry — AI might return valid JSON on retry
        continue;
      }

    } catch (apiError) {
      console.error(`[Gemini] API error (attempt ${attempt}):`, apiError.message);
      logError(apiError, `Gemini API attempt ${attempt} failed`);
      lastError = apiError;

      // Wait briefly before retry (exponential: 1s, 2s)
      if (attempt < MAX_RETRIES) {
        const delay = attempt * 1000;
        console.log(`[Gemini] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // STEP 2: All retries exhausted — return improved fallback
  console.error("[Gemini] All retries failed. Returning fallback analysis.");
  logError(lastError || new Error("All retries exhausted"), "Gemini API — all retries failed");

  return FALLBACK_ANALYSIS;
};
