import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { H1, Label } from "../../shared/typography";
import { Flex } from "../../shared/flex";
import { SelectContainer, Select } from "../../shared/select";
import Button from "../../shared/button";
import LoadingCat from "../../shared/loadingCat";
import welcomeSvg from "../../assets/welcome.svg";
import { GET_CATEGORIES } from "../../graphql/categoryGql";
import { DIFFICULTY, CategoryType } from "../../types";

type Props = {
  callback: (
    amount: number,
    difficulty: DIFFICULTY,
    category: number,
  ) => void;
};

const StartScreen: React.FC<Props> = ({ callback }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  const [category, setCategory] = useState<number>(9);
  const [name, setName] = useState<string>("");

  const validAmounts = [3, 5, 10, 15, 20];
  const difficulties = [DIFFICULTY.EASY, DIFFICULTY.MEDIUM, DIFFICULTY.HARD];

  const { loading, data, error } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      setCategories(data["getCategories"]);
      setCategory(parseInt(data["getCategories"][0].id));
    }
  }, [data]);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      gap={"20px"}
      style={{ paddingTop: "30px", minHeight: "90vh" }}
    >
      {loading && !error ? (
        <LoadingCat center={true} label={"Loading ...."} />
      ) : (
        <>
          <img src={welcomeSvg} alt={"Welcome cat"} style={{ width: "100%" }} />
          <H1 style={{ textAlign: "center" }}>TO THE TRIVIA</H1>
          {error && <h3>{error.message.toString()}</h3>}
          <Flex
            style={{ width: "100%" }}
            direction={"column"}
            align={"center"}
            gap={"20px"}
          >
            <div>
              <Label htmlFor="name-input">Enter your name</Label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <SelectContainer>
              <Label htmlFor="amount">Select number of questions</Label>
              <Select
                id="amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              >
                {validAmounts.map((amount, index) => (
                  <option value={amount} key={index}>
                    {amount}
                  </option>
                ))}
              </Select>
            </SelectContainer>

            <SelectContainer>
              <Label htmlFor="difficulty">Select difficulty</Label>
              <Select
                id="difficulty"
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    DIFFICULTY[
                      (parseInt(
                        e.target.value
                      ) as unknown) as keyof typeof DIFFICULTY
                    ]
                  )
                }
              >
                {difficulties.map((i, index) => (
                  <option value={index} key={index}>
                    {i.toLowerCase()}
                  </option>
                ))}
              </Select>
            </SelectContainer>

            <SelectContainer>
              <Label htmlFor="categories">Select category</Label>
              <Select
                id={"categories"}
                value={category}
                onChange={(e) => setCategory(parseInt(e.target.value))}
              >
                {categories.map((i) => (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                ))}
              </Select>
            </SelectContainer>

            <Button
              onClick={() => callback(amount, difficulty, category)}
              width={"100%"}
            >
              Start
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default StartScreen;
