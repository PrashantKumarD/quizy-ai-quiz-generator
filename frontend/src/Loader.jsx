import React, { useState } from "react";
import { Atom } from "react-loading-indicators";

const Loader = ({ type = "quiz" }) => {
  const [Count, setCount] = useState(0);
  const [text, setText] = useState(
    type === "feedback"
      ? "🧠 Analyzing Your Answers..."
      : "🧠 Analyzing Topic..."
  );

  const quizMessages = [
    "🧠 Analyzing Topic...",
    "✨ Generating Questions...",
    "📈 Setting Difficulty Levels...",
    "⚙️ Optimizing Answers...",
    "🏁 Almost Ready!",
  ];

  const feedbackMessages = [
    "🧠 Analyzing Your Answers...",
    "✨ Generating Personalized Feedback...",
    "📊 Calculating Performance Metrics...",
    "🔍 Identifying Strengths & Areas to Improve...",
    "🏁 Finalizing Your Results!",
  ];

  const messages = type === "feedback" ? feedbackMessages : quizMessages;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const newcount = (prevCount + 1) % messages.length;
        setText(messages[newcount]);
        return newcount;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/drihhul5s/image/upload/v1759866326/myback31_b1x4sx.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col items-center justify-center h-screen p-4"
    >
      <div className="relative">
        <Atom
          color="#3731cc"
          size={window.innerWidth < 640 ? "medium" : "large"}
          text=""
          textColor=""
        />
      </div>

      <p className="font-['Italiana'] mt-5 md:mt-7 text-3xl md:text-5xl flex flex-col md:flex-row font-bold text-gray-700 text-center">
        Generating Your{" "}
        <p className="text-[#3731cc] md:ml-2 text-orange-400">
          {type === "feedback" ? "Feedback" : "Quiz"}
        </p>
      </p>

      <p className="mt-5 md:mt-7 text-lg md:text-2xl font-semibold text-gray-600 animate-pulse text-center px-2">
        {text}
      </p>
    </div>
  );
};

export default Loader;
