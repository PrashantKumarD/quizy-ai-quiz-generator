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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          🏆 Quiz Completed!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Here’s your performance summary:
        </p>

        <div className="bg-gray-100 rounded-2xl p-6 mb-10 shadow-inner h-[120px]">
          <h2 className="text-4xl font-extrabold text-orange-500 text-center">
            {Math.round(state.score)}%
          </h2>
          <p className="text-gray-700 mt-2 font-medium text-center">
            Your Final Score
          </p>
        </div>

        {state.feedback && (
          <div className="bg-blue-300 text-white rounded-2xl p-8 mb-8 text-left shadow-lg">
            <h3 className="text-xl font-bold mb-4">� Performance Analysis</h3>

            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">💪 Your Strengths</h4>
              <ul className="list-disc list-inside pl-2 space-y-1">
                {state.feedback.strengths &&
                  state.feedback.strengths.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">
                🚀 Areas to Improve
              </h4>
              <ul className="list-disc list-inside pl-2 space-y-1">
                {state.feedback.improvements &&
                  state.feedback.improvements.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">❓ Common Mistakes</h4>
              <ul className="list-disc list-inside pl-2 space-y-1">
                {state.feedback.mistakes &&
                  state.feedback.mistakes.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {removeMarkdown(item)}
                    </li>
                  ))}
              </ul>
            </div>

            
            {state.feedback.conclusion && (
              <div className="mt-4 pt-3 border-t border-blue-200">
                <p className="text-sm italic">
                  {removeMarkdown(state.feedback.conclusion)}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRetake}
            className="cursor-pointer px-6 py-3 rounded-2xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            🔁 Retake Quiz
          </button>
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/");
            }}
            className="cursor-pointer px-6 py-3 rounded-2xl bg-green-300 text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
