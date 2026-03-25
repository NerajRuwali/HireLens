import OpenAI from "openai";

const MODEL_NAME = "gpt-4o-mini";
const MAX_RESUME_CHARS = 3000;
const FALLBACK_ANALYSIS = {
  score: 75,
  strengths: ["Strong MERN stack knowledge", "Good project experience"],
  weaknesses: ["Lack of quantified achievements", "Limited system design exposure"],
  missing_skills: ["Docker", "CI/CD", "Cloud (AWS/GCP)"],
  suggestions: [
    "Add measurable impact (e.g., improved performance by 30%)",
    "Include more backend scalability projects",
    "Highlight real-world problem solving",
  ],
  note: "Fallback response used due to API limitation",
};

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const hasApiKey = Boolean(apiKey && apiKey.trim());

  console.log("[OpenAI] API key present:", hasApiKey);
  if (!hasApiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your .env file.");
  }

  return new OpenAI({ apiKey: apiKey.trim() });
};

const cleanJsonText = (text) => {
  if (!text) return "";
  return text.replace(/```json\s*|```/gi, "").trim();
};

const normalizeAnalysis = (parsed) => {
  const data = parsed && typeof parsed === "object" ? parsed : {};

  const toStringArray = (value) =>
    Array.isArray(value) ? value.filter((v) => typeof v === "string" && v.trim()) : [];

  const scoreNum = Number(data.score);

  return {
    score: Number.isFinite(scoreNum) ? Math.max(0, Math.min(100, scoreNum)) : 0,
    strengths: toStringArray(data.strengths),
    weaknesses: toStringArray(data.weaknesses),
    missing_skills: toStringArray(data.missing_skills),
    suggestions: toStringArray(data.suggestions),
  };
};

export const analyzeResume = async (resumeText = "") => {
  try {
    const trimmedResume = String(resumeText).trim().slice(0, MAX_RESUME_CHARS);

    if (!trimmedResume) {
      return FALLBACK_ANALYSIS;
    }

    const prompt = `
You are an ATS resume analyzer.
Analyze the resume and return ONLY valid JSON with this exact schema:
{
  "score": number,
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggestions": []
}

Rules:
- No markdown
- No explanation
- No extra keys
- Keep score between 0 and 100

Resume:
${trimmedResume}
`;

    try {
      const client = getOpenAIClient();
      const response = await client.responses.create({
        model: MODEL_NAME,
        input: [
          {
            role: "system",
            content: "You are an ATS resume analyzer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        text: {
          format: {
            type: "json_object",
          },
        },
      });

      const text = response.output_text || "";

      console.log("OpenAI response:", text);

      if (!text || !text.trim()) {
        throw new Error("Empty response received from OpenAI.");
      }

      const cleanedText = cleanJsonText(text);

      try {
        return normalizeAnalysis(JSON.parse(cleanedText));
      } catch (parseError) {
        console.error("OpenAI error:", parseError);
        return {
          raw_response: cleanedText,
        };
      }
    } catch (error) {
      console.error("OpenAI failed, using fallback:", error.message);
      return FALLBACK_ANALYSIS;
    }
  } catch (error) {
    console.error("OpenAI failed, using fallback:", error.message);
    return FALLBACK_ANALYSIS;
  }
};

export const generateResume = async (userData) => {
  try {
    const prompt = `
You are an expert resume writer and ATS optimizer.
Take this user profile data and generate a structured resume content including a professional summary, perfectly crafted bullet points for experience, and formatted skills.
Return ONLY valid JSON with this exact schema:
{
  "professional_summary": "string",
  "experience_bullets": ["string"],
  "skills": ["string"]
}

User Data:
${JSON.stringify(userData)}
`;

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: MODEL_NAME,
      input: [
        { role: "system", content: "You are an expert ATS resume writer." },
        { role: "user", content: prompt },
      ],
      text: { format: { type: "json_object" } },
    });
    
    const text = response.output_text || "";
    return JSON.parse(cleanJsonText(text));
  } catch (error) {
    console.error("AI Resume Builder failed:", error.message);
    throw new Error("Failed to generate resume content");
  }
};

export const matchJob = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an expert ATS (Applicant Tracking System).
Compare this resume to the job description and return an analysis in ONLY valid JSON with this schema:
{
  "match_score": number (0-100),
  "matching_skills": ["string"],
  "missing_skills": ["string"],
  "recommendations": ["string"]
}

Resume text:
${String(resumeText).slice(0, 3000)}

Job Description:
${String(jobDescription).slice(0, 3000)}
`;

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: MODEL_NAME,
      input: [
        { role: "system", content: "You are an ATS parser." },
        { role: "user", content: prompt },
      ],
      text: { format: { type: "json_object" } },
    });
    
    const text = response.output_text || "";
    return JSON.parse(cleanJsonText(text));
  } catch (error) {
    console.error("AI Job Matching failed:", error.message);
    throw new Error("Failed to match job");
  }
};

export const generateCoverLetter = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an expert career coach.
Write a highly professional and tailored cover letter based on the provided resume and job description.
Return ONLY valid JSON with this exact schema:
{
  "cover_letter": "string (the full text of the letter)"
}

Resume text:
${String(resumeText).slice(0, 3000)}

Job Description:
${String(jobDescription).slice(0, 3000)}
`;

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: MODEL_NAME,
      input: [
        { role: "system", content: "You are an expert career coach." },
        { role: "user", content: prompt },
      ],
      text: { format: { type: "json_object" } },
    });
    
    const text = response.output_text || "";
    return JSON.parse(cleanJsonText(text));
  } catch (error) {
    console.error("AI Cover Letter failed:", error.message);
    throw new Error("Failed to generate cover letter");
  }
};

export const estimateSalary = async (jobTitle, skills, experience, location) => {
  try {
    const prompt = `
You are a senior technical recruiter and compensation analyst.
Estimate the realistic salary range for the following profile.
Return ONLY valid JSON with this exact schema:
{
  "estimated_low": number,
  "estimated_high": number,
  "median": number,
  "currency": "string (e.g., USD)",
  "confidence_reasoning": "string"
}

Profile Details:
Job Title: ${jobTitle}
Skills: ${skills}
Experience: ${experience}
Location: ${location}
`;

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: MODEL_NAME,
      input: [
        { role: "system", content: "You are a compensation analyst." },
        { role: "user", content: prompt },
      ],
      text: { format: { type: "json_object" } },
    });
    
    const text = response.output_text || "";
    return JSON.parse(cleanJsonText(text));
  } catch (error) {
    console.error("AI Salary Estimator failed:", error.message);
    throw new Error("Failed to estimate salary");
  }
};

export const checkOpenAIConnectivity = async () => {
  try {
    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: MODEL_NAME,
      input: "Reply with exactly this JSON: {\"status\":\"ok\"}",
      text: {
        format: {
          type: "json_object",
        },
      },
    });
    const text = response.output_text || "";
    const cleanedText = cleanJsonText(text);

    console.log("OpenAI response:", text);

    if (!cleanedText) {
      throw new Error("Empty response from OpenAI health check.");
    }

    return {
      provider: "openai",
      model: MODEL_NAME,
      connected: true,
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error(error?.message || "OpenAI connectivity check failed.");
  }
};