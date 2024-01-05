import React, { useState, useEffect } from "react";
import Word, { Translation } from "./Word";
import translationData from "./translationData";
import Player from "./Player";

interface QuizzProps {
  player: Player;
}

const Quizz: React.FC<QuizzProps> = ({ player }) => {
  const [countdown, setCountdown] = useState<number>(30);
  const [currentWord, setCurrentWord] = useState<Translation | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [mistakes, setMistakes] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const storedPlayer = Player.loadFromLocalStorage();
    if (storedPlayer) {
      player.username = storedPlayer.username;
      player.score = storedPlayer.score;
    }
  }, [player]);

  const handleNextWord = () => {
    setMessage("");
    setUserAnswer("");
    chooseRandomWord();
    setCountdown(30);
  };

  const chooseRandomWord = () => {
    const words: Translation[] = Object.entries(translationData).map(
      ([frenchTranslation, englishTranslation]) =>
        new Word(frenchTranslation, englishTranslation)
    );
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
  };

  const handleAnswerSubmit = () => {
    if (
      currentWord &&
      currentWord instanceof Word &&
      currentWord.verify(userAnswer)
    ) {
      setMessage("Correct!");
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      player.updateScore(player.score + 20);
    } else {
      setMessage("Incorrect. Try the next word!");
      setMistakes((prevMistakes) => prevMistakes + 1);
      const newScore = Math.max(player.score - 20, 0);
      player.updateScore(newScore);
    }

    setTimeout(() => {
      handleNextWord();
    }, 1000);
  };

  const handleResetGame = () => {
    setIsGameOver(false);
    setCorrectAnswers(0);
    setMistakes(0);
    player.updateScore(0);
    chooseRandomWord();
    setCountdown(30);
  };

  useEffect(() => {
    chooseRandomWord();

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      handleNextWord();
      setMistakes((prevMistakes) => prevMistakes + 1);
    }
  }, [countdown]);

  useEffect(() => {
    if (mistakes >= 5 || correctAnswers >= 10) {
      setIsGameOver(true);
    }
  }, [mistakes, correctAnswers]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center ">
      {isGameOver ? (
        <div className="flex flex-col h-96 justify-center items-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-10 lg:absolute lg:top-20">Game Over</h1>
          <p className="text-xl lg:text-4xl font-extrabold">Your Score: {player.score}</p>
          <p className="text-xl lg:text-4xl font-extrabold">
            Correct Answers: {correctAnswers}
          </p>
          <p className="text-xl lg:text-4xl font-extrabold">Mistakes: {mistakes}</p>
          <button
            className="bg-indigo-950 text-white px-5 py-2 rounded-xl mt-20 text-xl font-bold "
            onClick={handleResetGame}
          >
            Restart Game
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-36 w-60 lg:w-[60%] h-6 bg-red-200 rounded-lg overflow-hidden mt-4 mb-10 flex items-center justify-center">
            <h1 className="text-xl font-extrabold z-50">{countdown}s</h1>
            <div
              className="absolute top-0 left-0 h-full bg-red-400 transition-width"
              style={{
                width: `${countdown * (100 / 30)}%`,
                transition: "width 1s linear",
              }}
            ></div>
          </div>

          {currentWord && (
            <>
              <div className="absolute top-20 left-2">
              <h3 className="text-xl lg:text-2xl mb-2 font-extrabold">
                  Player: {player.username}
                </h3>
                <h3 className="text-xl lg:text-2xl mb-2 font-extrabold">
                  Score: {player.score}
                </h3>
              </div>

              <h2 className="text-2xl lg:text-3xl mb-2 font-extrabold">
                Translate the word:
              </h2>
              <p className="text-3xl lg:text-4xl font-extrabold text-red-400">
                {currentWord.frenchTranslation}
              </p>

              <input
                className="bg-indigo-200 mt-10 lg:mb-10 mb-4 rounded-lg w-60 lg:w-70 lg:h-12 h-10 text-xl text-center font-bold"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />

              <button
                className="bg-teal-300 px-5 py-2 rounded-xl mt-5 text-xl font-bold mb-4 lg:mb-10"
                onClick={handleAnswerSubmit}
              >
                Submit Answer
              </button>

              <p className="text-xl font-extrabold">{message}</p>
              <button
                className="bg-indigo-950 text-white px-5 py-2 rounded-xl mt-5 text-xl font-bold absolute bottom-10"
                onClick={handleResetGame}
              >
                Restart Game
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quizz;
