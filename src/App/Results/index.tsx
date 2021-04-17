import React from "react";
import { QuestionType } from "../../api/fetchQuestions";
import { Flex } from "../../shared/flex";
import { H2, H1 } from "../../shared/typography";

type Props = {
  points: number;
  questions: QuestionType[];
};

const ResultScreen: React.FC<Props> = ({ points, questions }) => {
  return (
    <Flex align={"center"} gap={"20px"}>
      <img src="/svgs/score.svg" alt="score chart" />
      <H2>Congratulations you’ve scored</H2>
      <H1>
        {points} out of {questions.length * 10}
      </H1>
    </Flex>
  );
};

export default ResultScreen;
