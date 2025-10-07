import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./QuizContext";
import TopicSelection from "./TopicSelection";
import SettingSelection from "./SettingSelection";
import QuestionCard from "./QuestionCard";
import SubmitPopUp from "./SubmitPopUp";
import Result from "./Result";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div 
      style={{ 
        backgroundImage: "url('/myback31.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%"
      }}
    >
      <QuizProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<TopicSelection />} />
              <Route path="/settings" element={<SettingSelection />} />
              <Route path="/quiz" element={<QuestionCard />} />
              <Route path="/submit" element={<SubmitPopUp />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </Router>
      </QuizProvider>
    </div>
  );
}

export default App;
