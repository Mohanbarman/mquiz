import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { H1, Label } from "../../shared/typography";
import { Flex } from "../../shared/flex";
import { SelectContainer, Select } from "../../shared/select";
import Button from "../../shared/button";
import LoadingCat from "../../shared/loadingCat";
import welcomeSvg from "../../assets/welcome.svg";
import { GET_CATEGORIES } from "../../graphql/categoryGql";
import { DIFFICULTY, CategoryType } from "../../types";
import { UserContext, UserContextType } from "../../provider/userProvider";
import { CREATE_USER } from "../../graphql/userGql";

type Props = {
  callback: (
    amount: number,
    difficulty: DIFFICULTY,
    category: CategoryType,
  ) => void;
};

const StartScreen: React.FC<Props> = ({ callback }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // input field value states
  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  const [category, setCategory] = useState<number>(9);
  const [name, setName] = useState<string>("");

  // input field validation
  const [nameError, setNameError] = useState<string>("");
  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(false);

  // graphql queries
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);
  const {
    loading: categoriesLoading,
    data: categoriesData,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);

  // getting data from context
  const { user, updateUser } = (useContext(
    UserContext
  ) as unknown) as UserContextType;

  // select field options
  const validAmounts = [3, 5, 10, 15, 20];
  const difficulties = [DIFFICULTY.EASY, DIFFICULTY.MEDIUM, DIFFICULTY.HARD];

  useEffect(() => {
    console.log(user);
    if (user?.name) {
      setName(user.name);
      setIsNameDisabled(true);
    }
  }, [user]);

  // setting categories state after fetching from api
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData["getCategories"]);
      setCategory(parseInt(categoriesData["getCategories"][0].id));
    }
  }, [categoriesData]);

  const validate = () => {
    if (!name.trim()) {
      setNameError("Name must not be empty");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    // getting category from categories array for callback
    const categoryObj = categories.find((i) => i.id === category);
    if (!categoryObj) return;

    // call callback function if user already exists in the context
    if (user && user.name && user.id) {
      callback(amount, difficulty, categoryObj);
      setNameError("");
      return;
    }

    // creating user if it doesn't exits in the context
    try {
      const res = await createUser({ variables: { name } });
      updateUser({
        name: res.data.createUser.name,
        id: res.data.createUser.id,
      });

      callback(amount, difficulty, categoryObj);
    } catch (e) {
      console.log(e);
    }
    setNameError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction={"column"}
        align={"center"}
        gap={"20px"}
        style={{ paddingTop: "30px", minHeight: "90vh" }}
      >
        {(categoriesLoading || createUserLoading) && !categoriesError ? (
          <LoadingCat center={true} label={"Loading ...."} />
        ) : (
          <>
            <img
              src={welcomeSvg}
              alt={"Welcome cat"}
              style={{ width: "100%" }}
            />
            <H1 style={{ textAlign: "center" }}>TO THE TRIVIA</H1>
            {categoriesError && <h3>{categoriesError.message.toString()}</h3>}
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
                  placeholder="Ex: John"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isNameDisabled}
                />
                <p>{nameError}</p>
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

              <Button type={"submit"} width={"100%"}>
                Start
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </form>
  );
};

export default StartScreen;
