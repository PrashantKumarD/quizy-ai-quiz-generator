import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./QuizContext";
import TopicSelection from "./TopicSelection";
import SettingSelection from "./SettingSelection";
import QuestionCard from "./QuestionCard";
import SubmitPopUp from "./SubmitPopUp";
import Result from "./Result";
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen w-full bg-[url('/myback31.jpg')] bg-cover bg-center bg-no-repeat">
      <QuizProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <div >
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
