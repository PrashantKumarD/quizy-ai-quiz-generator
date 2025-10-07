import React, { useState } from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

const SettingSelection = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state.topic) {
      navigate("/");
    }
  }, [state.topic, navigate]);

  const [settings, setSettings] = useState(state.settings);

  const handleStartQuiz = async () => {
    dispatch({ type: "SET_SETTINGS", payload: settings });
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: state.topic,
          ...settings,
        }),
      });
      const data = await res.json();
      console.log("Questions received from API:", data);
      dispatch({ type: "SET_QUESTIONS", payload: data });
      navigate("/quiz");
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  if (state.loading) {
    return <Loader type="quiz" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6">
      <h1 className="font-['Quicksand'] text-2xl md:text-4xl font-bold text-green-400 mb-5 md:mb-7 text-center shadow-text">
        Configure Your Quiz
      </h1>
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-800">
          Quiz Settings
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Language</label>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Number of Questions
          </label>
          <select
            value={settings.numQuestions}
            onChange={(e) =>
              setSettings({ ...settings, numQuestions: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Difficulty Level</label>
          <select
            value={settings.difficulty}
            onChange={(e) =>
              setSettings({ ...settings, difficulty: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Grade</label>
          <select
            value={settings.grade}
            onChange={(e) =>
              setSettings({ ...settings, grade: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Any Grade</option>
            <option>High School</option>
            <option>College</option>
            <option>Doctoral/PhD</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Number of Options</label>
          <select
            value={settings.numOptions}
            onChange={(e) =>
              setSettings({ ...settings, numOptions: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full bg-[#7765DA] hover:bg-[#6650C0] text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default SettingSelection;
