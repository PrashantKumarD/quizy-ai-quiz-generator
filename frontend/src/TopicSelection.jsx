import React, { useState } from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const topics = [
  { name: "Wellness", icon: "💆‍♀️" },
  { name: "Tech Trends", icon: "💻" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏺" },
  { name: "Sports", icon: "🏀" },
  { name: "Art", icon: "🎨" },
  { name: "Music", icon: "🎵" },
  { name: "Movies", icon: "🎬" },
  { name: "Literature", icon: "📚" },
  { name: "Gaming", icon: "🎮" },
  { name: "Travel", icon: "✈️" },
  { name: "Food", icon: "🍔" },
  { name: "Custom", icon: "✨" },
];

const TopicSelection = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [customTopic, setCustomTopic] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  React.useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  const handleSelect = (topicName) => {
    if (topicName === "Custom") {
      setIsCustomSelected(true);
      dispatch({ type: "SET_TOPIC", payload: "" });
    } else {
      setIsCustomSelected(false);
      setCustomTopic("");
      dispatch({ type: "SET_TOPIC", payload: topicName });
    }
  };

  const handleCustomSubmit = () => {
    if (customTopic.trim() !== "") {
      dispatch({ type: "SET_TOPIC", payload: customTopic.trim() });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 px-4 md:p-4">
      <h1 className="font-['Playfair Display'] text-3xl md:text-5xl flex flex-col md:flex-row font-bold text-black mb-5 text-center">
        🧠 Quizzy{" "}
        <p className="text-blue-400 font-semibold md:ml-2">AI Quiz Generator</p>
      </h1>

      <p className="mb-8 md:mb-12 text-center max-w-2xl text-gray-400 text-sm md:text-base">
        Empower your learning with AI. Choose any topic and get tailor-made
        quizzes designed to test and strengthen your knowledge.
      </p>

      <h1 className="font-['Poppins'] text-2xl md:text-3xl font-bold text-orange-400 mb-6 md:mb-8 text-center">
        Select Your Quiz Topic
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl">
        {topics.map((topic, index) => {
          const isSelected =
            state.topic === topic.name ||
            (isCustomSelected && topic.name === "Custom");
          return (
            <button
              key={index}
              onClick={() => handleSelect(topic.name)}
              className={`rounded-lg flex items-center justify-center gap-2 md:gap-3 text-lg font-semibold cursor-pointer w-full h-16 md:h-18 transition duration-300 shadow-md ${
                isSelected
                  ? "bg-purple-500 text-white scale-105 shadow-lg"
                  : "bg-white hover:bg-purple-300 hover:text-white text-gray-600"
              }`}
            >
              <span className="text-2xl md:text-4xl mb-0 md:mb-2">
                {topic.icon}
              </span>
              <span className="text-base md:text-[22px] font-semibold">
                {topic.name}
              </span>
            </button>
          );
        })}
      </div>

      {isCustomSelected && (
        <div className="relative w-full flex flex-col items-center mt-8">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Enter your custom topic..."
            className="border border-gray-400 rounded-lg px-4 py-2 w-full max-w-xs md:max-w-sm text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleCustomSubmit}
            className="cursor-pointer w-[180px] md:w-[200px] mt-3 bg-green-500 text-white px-6 md:px-8 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Confirm Topic
          </button>
        </div>
      )}

      <div className="flex mt-8 w-full justify-center">
        <button
          disabled={!state.topic}
          onClick={() => {
            toast.success(`Topic ${state.topic} Selected Successfully 🥳!`);
            navigate("/settings");
          }}
          className={`w-[180px] md:w-[200px] font-bold text-[18px] md:text-[20px] px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transform transition duration-300 mx-auto mb-4 ${
            state.topic
              ? "bg-purple-500 text-white hover:scale-105 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TopicSelection;
