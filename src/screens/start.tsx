import React, { useEffect, useState } from "react";
import fetchCategories, { CategoryType } from "../api/fetchCategories";
import { DIFFICULTY } from "../api/fetchQuestions";

type Props = {
  callback: (amount: number, difficulty: string|undefined, category: number|undefined) => void,
}

const StartScreen: React.FC<Props> = ({callback}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>('');
  const [category, setCategory] = useState<number>();
  const [error, setError] = useState<string>('');

  const validAmounts = [3, 5, 10, 15, 20];
  const difficulties = [DIFFICULTY.EASY, DIFFICULTY.HARD, DIFFICULTY.MEDIUM];

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Welcome to the trivia</h1>
      {error && <h3>{error}</h3>}
      {loading && !error ? (
        <h5>Loading...</h5>
      ) : (
        <div>
          <div>
            <label htmlFor="amount">Select number of questions</label>
            <select
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            >
              {validAmounts.map((amount, index) => (
                <option value={amount} key={index}>
                  {amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficulties.map((i, index) => (
                <option value={i} key={index}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="categories">Select category</label>
            <select
              id={"categories"}
              value={category}
              onChange={(e) => setCategory(parseInt(e.target.value))}
            >
              {categories.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button onClick={() => callback(amount, difficulty, category)}>
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
