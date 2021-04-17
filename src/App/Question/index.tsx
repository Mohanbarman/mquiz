import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "../../api/fetchQuestions";
import Button from "../../shared/button";
import { Flex } from "../../shared/flex";
import { Label } from "../../shared/typography";
import StyledQuestion from "./styledQuestion";
import StyledRadio from "./styledRadio";

type Props = {
  question: QuestionType;
  points: number;
  index: number;
  onNext: () => void;
  onAnswer: (isCorrect: boolean) => void;
};

const QuestionScreen: React.FC<Props> = ({
  question,
  points,
  index,
  onNext,
  onAnswer,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isAnsweredWrong, setIsAnsweredWrong] = useState(false);
  const rightAnswerRef = useRef<HTMLInputElement>(null);
  const correctAnswer = question.correct_answer;

  useEffect(() => {
    setIsDisabled(false);
    setIsAnsweredWrong(false);
    formRef.current?.reset();
  }, [index]);

  function handleAnswer(isCorrect: boolean) {
    onAnswer(isCorrect);
    setIsDisabled(true);
    setIsAnsweredWrong(!isCorrect);
  }

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <Flex
        direction="column"
        gap="30px"
        style={{ paddingTop: "30px" }}
        align={"center"}
      >
        <StyledQuestion
          heading={`Question : ${index + 1}`}
          body={question.question}
        />
        <Flex gap={"20px"} style={{ width: "100%" }}>
          {question.answers.map((answer, index) => (
            <StyledRadio
              color={correctAnswer === answer ? "green" : "red"}
              key={index}
              checked={isAnsweredWrong && correctAnswer === answer}
            >
              <input
                type="radio"
                name={"answer"}
                disabled={isDisabled}
                id={`answer-${question.id}-${index}`}
                value={answer}
                ref={correctAnswer === answer ? rightAnswerRef : undefined}
                onClick={() => handleAnswer(correctAnswer === answer)}
              />
              <Label
                htmlFor={`answer-${question.id}-${index}`}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </StyledRadio>
          ))}
        </Flex>
        <Button type="submit" onClick={() => onNext()} width="100%">
          Next
        </Button>
      </Flex>
    </form>
  );
};

export default QuestionScreen;
