import React from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";

const QuestionCard = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  console.log("Questions in state:", state.questions);
  console.log("Current index:", state.currentIndex);
  const question = state.questions[state.currentIndex];

  React.useEffect(() => {
    if (!state.questions || state.questions.length === 0) {
      navigate("/");
    }
  }, [state.questions, navigate]);

  if (!question) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">No questions found. Redirecting to home...</p>
      </div>
    );
  }

  const handleSelect = (index) => {
    dispatch({
      type: "SET_ANSWER",
      payload: { index: state.currentIndex, answer: index },
    });
  };

  const handleNext = () => {
    if (state.currentIndex < state.questions.length - 1) {
      dispatch({ type: "SET_CURRENT_INDEX", payload: state.currentIndex + 1 });
    } else {
      navigate("/submit");
    }
  };

  const handlePrevious = () => {
    if (state.currentIndex > 0) {
      dispatch({ type: "SET_CURRENT_INDEX", payload: state.currentIndex - 1 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-3 md:p-4">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 mx-auto">
        <div className="mb-3 md:mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
            <div
              className="bg-[#7765DA] h-2 md:h-3 rounded-full"
              style={{
                width: `${
                  ((state.currentIndex + 1) / state.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-right text-xs md:text-sm text-gray-500 mt-1">
            {state.currentIndex + 1} / {state.questions.length}
          </p>
        </div>

        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">
          {question.question}
        </h2>

        <div className="grid gap-2 md:gap-3">
          {question.options.map((opt, idx) => {
            const selected = state.answers[state.currentIndex] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`px-3 md:px-4 py-2 md:py-3 text-left border rounded-lg md:rounded-xl text-base md:text-lg font-medium transition ${
                  selected
                    ? "bg-[#7765DA] text-white border-transparent"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-6 md:mt-8">
          <button
            onClick={handlePrevious}
            disabled={state.currentIndex === 0}
            className="px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 md:px-8 py-2 rounded-full text-sm md:text-base font-semibold text-white bg-[#7765DA] hover:bg-[#6650C0]"
          >
            {state.currentIndex === state.questions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
