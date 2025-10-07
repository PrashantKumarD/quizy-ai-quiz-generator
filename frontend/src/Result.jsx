import React from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";

const removeMarkdown = (text) => {
  if (!text) return text;
  return text.replace(/[*_~`]/g, "");
};

const Result = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      !state.questions ||
      state.questions.length === 0 ||
      (state.score === 0 && state.answers.length === 0)
    ) {
      navigate("/");
    }
  }, [state.questions, state.score, state.answers, navigate]);

  const handleRetake = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 md:p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-3xl p-4 md:p-10 w-full max-w-4xl mx-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          🏆 Quiz Completed!
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 text-center">
          Here's your performance summary:
        </p>

        <div className="bg-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-10 shadow-inner h-[100px] md:h-[120px]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-500 text-center">
            {Math.round(state.score)}%
          </h2>
          <p className="text-sm md:text-base text-gray-700 mt-2 font-medium text-center">
            Your Final Score
          </p>
        </div>

        {state.feedback && (
          <div className="bg-blue-300 text-white rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8 text-left shadow-lg">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              ✅ Performance Analysis
            </h3>

            <div className="mb-3 md:mb-4">
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                💪 Your Strengths
              </h4>
              <ul className="list-disc list-inside pl-1 md:pl-2 space-y-1">
                {state.feedback.strengths &&
                  state.feedback.strengths.map((item, idx) => (
                    <li key={idx} className="text-xs md:text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mb-3 md:mb-4">
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                🚀 Areas to Improve
              </h4>
              <ul className="list-disc list-inside pl-1 md:pl-2 space-y-1">
                {state.feedback.improvements &&
                  state.feedback.improvements.map((item, idx) => (
                    <li key={idx} className="text-xs md:text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mb-3 md:mb-4">
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                ❓ Common Mistakes
              </h4>
              <ul className="list-disc list-inside pl-1 md:pl-2 space-y-1">
                {state.feedback.mistakes &&
                  state.feedback.mistakes.map((item, idx) => (
                    <li key={idx} className="text-xs md:text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            {state.feedback.conclusion && (
              <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-blue-200">
                <p className="text-xs md:text-sm italic">
                  {removeMarkdown(state.feedback.conclusion)}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4">
          <button
            onClick={handleRetake}
            className="cursor-pointer px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all duration-300 text-sm md:text-base"
          >
            🔁 Retake Quiz
          </button>
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/");
            }}
            className="cursor-pointer mt-2 md:mt-0 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-green-300 text-white font-semibold hover:scale-105 transition-all duration-300 text-sm md:text-base"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
