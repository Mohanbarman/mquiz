import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLazyQuery, useMutation } from "@apollo/client";

import LoadingCat from "../shared/loadingCat";
import { UserContext, UserContextType } from "../provider/userProvider";
import QuestionScreen from "./Question";
import ResultScreen from "./Results";
import StartScreen from "./Welcome";
import { QuestionType, DIFFICULTY } from "../types";
import { GET_QUESTIONS } from "../graphql/questionsGql";
import { H2 } from "../shared/typography";

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  const { user } = (useContext(UserContext) as unknown) as UserContextType;
  const [difficulty, setDifficulty] = useState<string>("Easy");

  const [
    getQuestions,
    { data: questionsData, error: questionsError, loading: isLoadingQuestions },
  ] = useLazyQuery(GET_QUESTIONS);

  async function loadQuestions(
    amount: number,
    difficulty: DIFFICULTY,
    categoryID: number
  ) {
    getQuestions({
      variables: { amount, categoryID, difficulty: DIFFICULTY[difficulty] },
    });
  }

  useEffect(() => {
    if (questionsData) {
      setQuestions(questionsData['getQuestions']);
      setIsGameStarted(true);
    }
  }, [questionsData]);

  function handleNextQuestion() {
    setCurrentQuestionIndex((p) => {
      // game over if user is on last question and presses next
      if (p + 2 === questions.length) {
        submitResult();
        setIsGameOver(true);
        setIsGameStarted(false);
        return 0;
      }
      return p + 1;
    });
  }

  async function submitResult() {

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
      {questionsError && <H2>{questionsError.message}</H2>}
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
