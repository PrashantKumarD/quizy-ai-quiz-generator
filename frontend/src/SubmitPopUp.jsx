import React, { useState } from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

const SubmitPopUp = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!state.questions || state.questions.length === 0) {
      navigate("/");
    }
  }, [state.questions, navigate]);

  const handleSubmit = async () => {
    const anyAnswered = state.answers.some(
      (ans) => ans !== undefined && ans !== null
    );

    if (!anyAnswered) {
      toast.error("You must answer at least one question before submitting!");
      return;
    }
    setIsSubmitting(true);

    let score = 0;
    state.questions.forEach((q, idx) => {
      if (state.answers[idx] === q.correctIndex)
        score += 100 / state.questions.length;
    });
    dispatch({ type: "SET_SCORE", payload: score });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          summary: state.questions.map((q, idx) => ({
            question: q.question,
            yourAnswer: q.options[state.answers[idx]],
            correctAnswer: q.options[q.correctIndex],
          })),
        }),
      });
      const data = await res.json();
      console.log("Feedback API response:", data);

      if (data.success && data.feedback) {
        dispatch({ type: "SET_FEEDBACK", payload: data.feedback });
      } else {
        console.error("Invalid feedback data structure:", data);

        dispatch({
          type: "SET_FEEDBACK",
          payload: {
            strengths: [
              "You completed the full quiz",
              "You attempted all questions",
              "You showed persistence in answering challenging questions",
            ],
            improvements: [
              "Review the topic areas where you made mistakes",
              "Practice more questions on similar subjects",
              "Focus on understanding core concepts before details",
            ],
            mistakes: [
              "Some questions may have been misunderstood",
              "You might have rushed through certain questions",
              "Consider reading questions more carefully",
            ],
            conclusion:
              "Your effort is commendable. With targeted practice and review, you'll see improvement in your next quiz.",
            message: "Thanks for taking the quiz! Keep learning and growing!",
          },
        });
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: "SET_FEEDBACK",
        payload: {
          strengths: [
            "You completed the full quiz",
            "You engaged with all the questions",
            "You demonstrated knowledge in this subject area",
          ],
          improvements: [
            "Review fundamental concepts related to this topic",
            "Try additional practice questions",
            "Consider studying specific areas that challenged you",
          ],
          mistakes: [
            "Check for common misconceptions in this topic",
            "Some answers may have been misinterpreted",
            "Pay attention to key terms in questions",
          ],
          conclusion:
            "Your participation shows your commitment to learning. Continue practicing and you'll improve your understanding of this topic.",
          message: "Thanks for your patience!",
        },
      });
    }

    setIsSubmitting(false);
    navigate("/result");
  };

  if (isSubmitting) {
    return <Loader type="feedback" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">
          ⚠️ Are you sure you want to submit your quiz?
        </h2>
        <p className="text-gray-600 mb-10">
          Once submitted, you won’t be able to change your answers.
        </p>

        <div className="flex justify-center gap-5">
          <button
            onClick={() => navigate("/quiz")}
            className="cursor-pointer px-6 py-3 rounded-2xl border border-gray-400 text-gray-700 font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            🔙 Revisit
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-6 py-3 rounded-2xl bg-green-400 text-white font-semibold text-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            ✅ Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPopUp;
