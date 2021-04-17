import React from "react";
import { QuestionType } from "../../api/fetchQuestions";
import Button from "../../shared/button";
import { Flex } from "../../shared/flex";
import { H2, H1 } from "../../shared/typography";

type Props = {
  points: number;
  questions: QuestionType[];
  onPlayAgain: () => void;
};

const ResultScreen: React.FC<Props> = ({ points, questions, onPlayAgain }) => {
  return (
    <Flex align={"center"} gap={"20px"}>
      <img src="/svgs/score.svg" alt="score chart" style={{width: '100%'}}/>
      <H2>Congratulations you’ve scored</H2>
      <H1>
        {points} out of {questions.length * 10}
      </H1>
      <Button onClick={onPlayAgain}>Play again</Button>
    </Flex>
  );
};

export default ResultScreen;
