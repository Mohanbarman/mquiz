import React, { useState } from "react";
import fetchQuestions, { QuestionType } from "../api/fetchQuestions";
import QuestionScreen from "./Question";
import ResultScreen from "./Results";
import StartScreen from "./Welcome";
import styled from "styled-components";

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  width: 100%;
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

  async function loadQuestions(
    amount: number,
    difficulty: string | undefined,
    categoryID: number | undefined
  ) {
    const questionsResponse = await fetchQuestions(
      amount,
      difficulty,
      categoryID
    );
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

  return (
    <CenterContainer>
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
        {isGameOver && <ResultScreen points={points} questions={questions} />}
      </CenterContainerChild>
    </CenterContainer>
  );
};

export default App;
