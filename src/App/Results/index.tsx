import React from "react";
import { QuestionType } from "../../api/fetchQuestions";

type Props = {
    points: number;
    questions: QuestionType[];
}

const ResultScreen: React.FC<Props> = ({points, questions}) => {
  return (
    <div>
      <h1>Results</h1>
      <h4>You've scored {points} points out of {questions.length * 10}</h4>
    </div>
  );
};

export default ResultScreen;
