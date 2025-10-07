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
    <div className=" flex flex-col items-center justify-center h-screen bg-[url('/myback31.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative">
        <Atom color="#3731cc" size="large" text="" textColor="" />
      </div>

      <p className="font-['Italiana'] mt-7 text-5xl flex font-bold text-gray-700">
        Generating Your{" "}
        <p className="text-[#3731cc] ml-2 text-orange-400">
          {type === "feedback" ? "Feedback" : "Quiz"}
        </p>
      </p>

      <p className="mt-7 text-2xl font-semibold text-gray-600 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
