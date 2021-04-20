import React, { useEffect, useState } from "react";
import fetchCategories, { CategoryType } from "../../api/fetchCategories";
import { DIFFICULTY } from "../../api/fetchQuestions";
import { H1, Label } from "../../shared/typography";
import { Flex } from "../../shared/flex";
import { SelectContainer, Select } from "../../shared/select";
import Button from "../../shared/button";
import LoadingCat from "../../shared/loadingCat";
import welcomeSvg from "../../assets/welcome.svg";

type Props = {
  callback: (
    name: string,
    amount: number,
    difficulty: string | undefined,
    category: number | undefined
  ) => void;
};

const StartScreen: React.FC<Props> = ({ callback }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>("");
  const [category, setCategory] = useState<number>();
  const [name, setName] = useState<string>("");

  const validAmounts = [3, 5, 10, 15, 20];
  const difficulties = [DIFFICULTY.EASY, DIFFICULTY.MEDIUM, DIFFICULTY.HARD];

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

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
          {error && <h3>{error}</h3>}
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
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((i, index) => (
                  <option value={i} key={index}>
                    {i}
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
              onClick={() => callback(name, amount, difficulty, category)}
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
