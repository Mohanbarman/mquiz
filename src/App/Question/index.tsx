import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "@api/fetchQuestions";

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

  useEffect(() => {
    setIsDisabled(false);
    formRef.current?.reset();
  }, [index]);

  return (
    <div>
      <h3>
        Question : ${index + 1} {question.question}
      </h3>
      <form ref={formRef} onSubmit={e => e.preventDefault()} action="#">
        {question.answers.map((answer, index) => (
          <div key={index}>
            <input
              type="radio"
              name={"answer"}
              disabled={isDisabled}
              id={`answer-${question.id}-${index}`}
              value={answer}
              onClick={() => {
                onAnswer(question.correct_answer === answer);
                setIsDisabled(true);
              }}
            />
            <label htmlFor={`answer-${question.id}-${index}`}>{answer}</label>
          </div>
        ))}
        <button type="submit" onClick={() => onNext()}>Next</button>
      </form>
    </div>
  );
};

export default QuestionScreen;
