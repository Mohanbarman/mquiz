import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import Button from "../../shared/button";
import { Flex } from "../../shared/flex";
import { H2, H1 } from "../../shared/typography";
import { QuestionType } from "../../types";
import { UserContext, UserContextType } from "../../provider/userProvider";
import Table from "../../shared/table";
import { useQuery } from "@apollo/client";
import { GET_RESULTS } from "../../graphql/resultGql";
import LoadingCat from "../../shared/loadingCat";

type Props = {
  points: number;
  questions: QuestionType[];
  onPlayAgain: () => void;
};

type ResultType = {
  createdAt: string;
  category: string;
  difficulty: string;
  rightQuestions: number;
  totalQuestions: number;
  user: {
    id: string;
    name: string;
  };
};

const ResultScreen: React.FC<Props> = ({ points, questions, onPlayAgain }) => {
  const { user } = (useContext(UserContext) as unknown) as UserContextType;
  const resultHeaders = ["Name", "Time", "Category", "Score"];
  const [results, setResults] = useState<ResultType[]>();

  const resultBody = results?.map((i) => [
    i.user.id === user.id ? "You" : i.user.name,
    moment(parseInt(i.createdAt)).fromNow(),
    i.category,
    `${Math.floor((i.rightQuestions / i.totalQuestions) * 100)}%`,
  ]);

  const {
    data: resultData,
    loading: resultsLoading,
    error: resultsError,
  } = useQuery(GET_RESULTS);

  useEffect(() => {
    if (resultData) {
      setResults(resultData.getResults);
      console.log(resultData.getResults);
    }
  }, [resultData]);

  return (
    <Flex align={"center"} gap={"5px"}>
      <H2 style={{ textAlign: "center" }}>{user.name} you’ve scored</H2>
      <H1>
        {points} out of {questions.length * 10}
      </H1>
      <Button onClick={onPlayAgain}>Play again</Button>
      <H2 style={{ textAlign: "center", margin: '30px 0' }}>SCOREBOARD</H2>
      {resultBody && !resultsLoading ? (
        <Table headers={resultHeaders} body={resultBody} />
      ) : (
        <LoadingCat label={"Loading scores..."} />
      )}
    </Flex>
  );
};

export default ResultScreen;
