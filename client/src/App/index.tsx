import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLazyQuery, useMutation } from "@apollo/client";

import LoadingCat from "../shared/loadingCat";
import { UserContext, UserContextType } from "../provider/userProvider";
import QuestionScreen from "./Question";
import ResultScreen from "./Results";
import StartScreen from "./Welcome";
import { QuestionType, DIFFICULTY, CategoryType } from "../types";
import { GET_QUESTIONS } from "../graphql/questionsGql";
import { H2 } from "../shared/typography";
import { ADD_RESULT } from "../graphql/resultGql";

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
  min-height: 100vh;
`;

const CenterContainerChild = styled.div`
  max-width: 600px;
  width: 100%;
`;

const App: React.FC = () => {
  // game main state
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // states to register user result
  const { user } = (useContext(UserContext) as unknown) as UserContextType;
  const [difficulty, setDifficulty] = useState<DIFFICULTY>();
  const [category, setCategory] = useState<CategoryType>();

  // graphql queries and mutation
  const [
    getQuestions,
    { data: questionsData, error: questionsError, loading: isLoadingQuestions },
  ] = useLazyQuery(GET_QUESTIONS);
  const [addResult, { loading: addResultLoading }] = useMutation(ADD_RESULT);

  /**
   * Load questions from the api
   * @param amount Number of questions to load
   * @param difficulty Difficulty of questions
   * @param categoryID Category of questions
   */
  function loadQuestions(
    amount: number,
    difficulty: DIFFICULTY,
    category: CategoryType
  ) {
    setDifficulty(difficulty);
    setCategory(category);
    getQuestions({
      variables: {
        amount,
        categoryID: category.id,
        difficulty: DIFFICULTY[difficulty],
      },
    });
  }

  // update game state after receiving questions data from the api
  useEffect(() => {
    if (questionsData) {
      setQuestions(questionsData["getQuestions"]);
      setIsGameStarted(true);
    }
  }, [questionsData]);

  function handleNextQuestion() {
    setCurrentQuestionIndex((p) => {
      // game over if user is on last question and presses next
      if (p + 2 === questions.length) {
        submitResult();
        return 0;
      }
      return p + 1;
    });
  }

  // submit result to the api
  async function submitResult() {
    try {
      if (!difficulty) return;

      const resultObj = {
        category: category?.name,
        userID: user.id,
        difficulty: DIFFICULTY[difficulty],
        totalQuestions: questions.length,
        rightQuestions: points / 10,
      };

      const res = await addResult({ variables: resultObj });
      console.log(res);

      setIsGameOver(true);
      setIsGameStarted(false);
    } catch (e) {
      console.log(e);
    }
  }

  function handleAnswerSubmit(isCorrect: boolean) {
    if (isCorrect) {
      // incrementing points by 10 for each right answer submit
      // TODO: increment points based on difficulty EASY: 10, MEDIUM: 20, HARD: 30
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
      {addResultLoading && (
        <LoadingCat center={true} label={"Submitting result..."} />
      )}
      {isLoadingQuestions ? (
        <LoadingCat center={true} label={"Loading questions..."} />
      ) : (
        <CenterContainerChild>
          {isGameStarted && !addResultLoading && (
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
          {isGameOver && !addResultLoading && (
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
