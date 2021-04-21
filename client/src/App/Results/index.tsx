import React from "react";

import Button from "../../shared/button";
import { Flex } from "../../shared/flex";
import { H2, H1 } from "../../shared/typography";
import resultSvg from "../../assets/score.svg";
import { QuestionType } from "../../types";

type Props = {
  points: number;
  questions: QuestionType[];
  onPlayAgain: () => void;
};

const ResultScreen: React.FC<Props> = ({ points, questions, onPlayAgain }) => {
  return (
    <Flex align={"center"} gap={"20px"}>
      <img src={resultSvg} alt="score chart" style={{ width: "100%" }} />
      <H2>Congratulations you’ve scored</H2>
      <H1>
        {points} out of {questions.length * 10}
      </H1>
      <Button onClick={onPlayAgain}>Play again</Button>
    </Flex>
  );
};

export default ResultScreen;
