import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const questionSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          question: { type: "string" },
          options: {
            type: "array",
            minItems: 2,
            maxItems: 5,
            items: { type: "string" },
          },
          correctIndex: { type: "integer", minimum: 0 },
        },
        required: ["id", "question", "options", "correctIndex"],
        additionalProperties: false,
      },
    },
  },
  required: ["questions"],
  additionalProperties: false,
};

const feedbackSchema = {
  type: "object",
  properties: {
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
    mistakes: { type: "array", items: { type: "string" } },
    conclusion: { type: "string" },
    message: { type: "string" },
  },
  required: ["strengths", "improvements", "mistakes", "conclusion", "message"],
  additionalProperties: false,
};

const validateQuestions = ajv.compile(questionSchema);
const validateFeedback = ajv.compile(feedbackSchema);

export function validateQuestionsJSON(obj) {
  const valid = validateQuestions(obj);
  return { valid, errors: valid ? null : validateQuestions.errors };
}

export function validateFeedbackJSON(obj) {
  const valid = validateFeedback(obj);
  return { valid, errors: valid ? null : validateFeedback.errors };
}
