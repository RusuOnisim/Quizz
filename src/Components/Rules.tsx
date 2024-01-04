import React, { useState } from "react";
import Quizz from "./Quizz";
function Rules() {
  const [isQuizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="w-full h-full">
      {!isQuizStarted ? (
        <React.Fragment>
          <div className="h-full flex flex-col items-center justify-center pb-20">
            <h1 className=" font-extrabold text-xl text-center mb-3">
              Ready to flex those translation muscles?
            </h1>
            <p className="p-3 font-medium text-lg text-center">
              Translate 10 words in the blink of an eye - you've got 30 seconds
              each! Hit "Start" and let the linguistic showdown begin!
            </p>
            <img src="/brain.svg" alt="Brain" className="h-40 w-40" />           
             <button
              className="bg-teal-300 px-5 py-1 rounded-xl mt-5 text-xl font-bold"
              onClick={handleStartQuiz}
            >
              Start
            </button>
          </div>
        </React.Fragment>
      ) : (
        <Quizz />
      )}
    </div>
  );
}

export default Rules;
