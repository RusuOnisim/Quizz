import React, { useState } from "react";
import Quizz from "./Quizz";
import Player from "./Player";

function Rules() {
  const [isQuizStarted, setQuizStarted] = useState(false);
  const [username, setUsername] = useState("");

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-full">
      {!isQuizStarted ? (
        <React.Fragment>
          <div className="h-full flex flex-col items-center justify-center pb-20">
            <h1 className=" font-extrabold text-xl lg:text-3xl text-center mb-3 mt-2">
              Ready to flex those translation muscles?
            </h1>
            <p className="p-3 font-medium text-lg lg:text-2xl text-center">
              Translate 10 words in the blink of an eye - you've got 30 seconds
              each! Hit "Start" and let the linguistic showdown begin!
            </p>
            <img src="./brain.svg" alt="Brain" className="h-40 w-40 lg:h-60 lg:w-60 my-5" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              className="bg-gray-200 mt-5 mb-4 rounded-lg w-60 h-10 text-xl text-center font-bold"
            />
            <button
              className="bg-teal-300 px-5 py-1 rounded-xl mt-10 lg:mt-20 text-xl lg:text-2xl font-bold lg:px-10 lg:py-2"
              onClick={handleStartQuiz}
            >
              Start Game
            </button>
          </div>
        </React.Fragment>
      ) : (
        <Quizz player={new Player(username)} /> 
      )}
    </div>
  );
}

export default Rules;
