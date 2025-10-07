import { getAIQuestions, getAIFeedback } from "../services/aiServices.js";

export const generateQuestions = async (req, res) => {
  try {
    const {
      topic,
      numQuestions = 5,
      grade = "Any grade",
      difficulty = "Medium",
      language = "English",
      numOptions = 4,
    } = req.body;
    if (!topic) {
      return res
        .status(400)
        .json({ success: false, error: "Topic is required" });
    }
    const questions = await getAIQuestions({
      topic,
      numQuestions: Number(numQuestions),
      grade,
      difficulty,
      language,
      numOptions: Number(numOptions),
    });
    return res.status(200).json(questions);
  } catch (err) {
    console.error("AI generate error", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err.message || "Failed to generate the qquestions.",
      });
  }
};

export const generateFeedback = async (req, res) => {
  try {
    const { score, summary } = req.body;
    if (score == null || !summary) {
      return res
        .status(400)
        .json({ success: false, error: "Score and summary are required" });
    }
    const feedback = await getAIFeedback({ score: Number(score), summary });
    return res.status(200).json({ success: true, feedback });
  } catch (err) {
    console.error("AI feedback error", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err.message || "Failed to generate feedback.",
      });
  }
};
