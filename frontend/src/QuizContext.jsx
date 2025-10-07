import React, { createContext, useReducer, useContext } from "react";

const QuizContext = createContext();

const initialState = {
  topic: null,
  settings: {
    language: "English",
    numQuestions: 5,
    difficulty: "Medium",
    grade: "Any Grade",
    numOptions: 4,
  },
  questions: [],
  answers: [],
  currentIndex: 0,
  score: 0,
  feedback: null,
  loading: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_TOPIC":
      return { ...state, topic: action.payload };
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ANSWER":
      const newAnswers = [...state.answers];
      newAnswers[action.payload.index] = action.payload.answer;
      return { ...state, answers: newAnswers };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_CURRENT_INDEX":
      return { ...state, currentIndex: action.payload };
    case "SET_FEEDBACK":
      return { ...state, feedback: action.payload };
    case "RESET":
      return {
        topic: null,
        settings: {
          language: "English",
          numQuestions: 5,
          difficulty: "Medium",
          grade: "Any Grade",
          numOptions: 4,
        },
        questions: [],
        answers: [],
        currentIndex: 0,
        score: 0,
        feedback: null,
        loading: false,
      };
    default:
      return state;
  }
}

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
