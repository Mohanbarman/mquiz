import React, { useState } from "react";
import fetchQuestions, { QuestionType } from "../api/fetchQuestions";
import QuestionScreen from "./Question";
import ResultScreen from "./Results";
import StartScreen from "./Welcome";
import styled from "styled-components";
import LoadingCat from "../shared/loadingCat";

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  width: 100%;
  min-height: 100vh;
`;

const CenterContainerChild = styled.div`
  max-width: 500px;
  width: 100%;
`;

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  async function loadQuestions(
    name: string,
    amount: number,
    difficulty: string | undefined,
    categoryID: number | undefined
  ) {
    setIsLoadingQuestions(true);
    setName(name);
    const questionsResponse = await fetchQuestions(
      amount,
      difficulty,
      categoryID
    );
    setIsLoadingQuestions(false);
    setQuestions(questionsResponse);
    setIsGameStarted(true);
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex((p) => {
      // game over if user is on last question and presses next
      if (p + 2 === questions.length) {
        setIsGameOver(true);
        setIsGameStarted(false);
        return 0;
      }
      return p + 1;
    });
  }

  function handleAnswerSubmit(isCorrect: boolean) {
    if (isCorrect) {
      setPoints((p) => p + 10);
    }
  }

  function handlePlayAgain() {
    setIsGameOver(false);
    setPoints(0);
    setCurrentQuestionIndex(0);
  }

  return (
    <CenterContainer>
      {isLoadingQuestions ? (
        <LoadingCat center={true} label={"Loading questions..."} />
      ) : (
        <CenterContainerChild>
          {isGameStarted && (
            <QuestionScreen
              question={questions[currentQuestionIndex]}
              points={points}
              onNext={handleNextQuestion}
              onAnswer={handleAnswerSubmit}
              index={currentQuestionIndex}
            />
          )}
          {!isGameOver && !isGameStarted && (
            <StartScreen callback={loadQuestions} />
          )}
          {isGameOver && (
            <ResultScreen
              onPlayAgain={handlePlayAgain}
              points={points}
              questions={questions}
            />
          )}
        </CenterContainerChild>
      )}
    </CenterContainer>
  );
};

export default App;
