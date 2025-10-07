import OpenAI from "openai";
import dotenv from "dotenv";
import { extractJsonFromText } from "../utils/jsonHelper.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  validateQuestionsJSON,
  validateFeedbackJSON,
} from "../utils/validators.js";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function callModel(prompt, system = "", maxTokens = 800) {
  const input = system ? `${system}\n\n${prompt}` : prompt;
  const result = await model.generateContent(input);
  const response = await result.response;
  return response.text() || "";
}

export async function getAIQuestions({
  topic,
  numQuestions = 5,
  grade = "Any Grade",
  difficulty = "Medium",
  language = "English",
  numOptions = 4,
}) {
  const system = `
You are a JSON-only quiz generator. Output valid JSON only in this format:
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": ["string"],
      "correctIndex": 0
    }
  ]
}
Each question must have only ${numOptions} options.
Language: ${language}, Difficulty: ${difficulty}, Grade: ${grade}.
`;

  const prompt = `Generate ${numQuestions} MCQs on "${topic}".`;

  for (let i = 0; i < 3; i++) {
    try {
      const raw = await callModel(prompt, system, 1200);
      const parsed = JSON.parse(extractJsonFromText(raw));
      const valid = validateQuestionsJSON(parsed);
      if (!valid.valid) throw new Error(valid.errors);
      return parsed.questions.slice(0, numQuestions);
    } catch (err) {
      if (i === 2)
        throw new Error("Failed to get valid AI questions: " + err.message);
    }
  }
}


function removeMarkdownFormatting(text) {
  if (!text) return text;
 
  return text.replace(/[*_~`]/g, "");
}


function cleanFeedbackMarkdown(feedback) {
  if (!feedback) return feedback;

  const cleanFeedback = { ...feedback };

  
  ["strengths", "improvements", "mistakes"].forEach((key) => {
    if (Array.isArray(cleanFeedback[key])) {
      cleanFeedback[key] = cleanFeedback[key].map((item) =>
        removeMarkdownFormatting(item)
      );
    }
  });

  
  ["conclusion", "message"].forEach((key) => {
    if (typeof cleanFeedback[key] === "string") {
      cleanFeedback[key] = removeMarkdownFormatting(cleanFeedback[key]);
    }
  });

  return cleanFeedback;
}

export async function getAIFeedback({ score, summary }) {
  const system = `
You are an AI assistant that outputs JSON in this format:
{
  "strengths": ["string", "string", "string"],
  "improvements": ["string", "string", "string"],
  "mistakes": ["string", "string", "string"],
  "conclusion": "string",
  "message": "string"
}

Do not use any markdown formatting in your response. No asterisks, underscores, or other special formatting characters.
`;

  const prompt = `
User score: ${score}/100
Quiz summary: ${summary}

Provide:
- 3 strengths based on what the user did well in the quiz (as simple text points, do NOT use markdown formatting)
- 3 areas for improvement (as simple text points, do NOT use markdown formatting)
- 3 specific mistakes identified and why they happened (as simple text points, do NOT use markdown formatting)
- A brief conclusion paragraph (2-3 sentences, no markdown formatting)
- An encouraging 1-line message (no markdown formatting)

IMPORTANT: Do NOT use asterisks (*), underscores (_), or any markdown formatting in your response. Provide plain text only.
`;

  for (let i = 0; i < 3; i++) {
    try {
      const raw = await callModel(prompt, system, 600);
      const parsed = JSON.parse(extractJsonFromText(raw));
      const valid = validateFeedbackJSON(parsed);
      if (!valid.valid) throw new Error(valid.errors);

      
      const cleanedFeedback = cleanFeedbackMarkdown(parsed);

      return cleanedFeedback;
    } catch (err) {
      if (i === 2)
        throw new Error("Failed to get valid feedback: " + err.message);
    }
  }
}
