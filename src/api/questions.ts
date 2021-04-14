import querystring from 'querystring';
import { shuffleArray } from '../utils';

export type QuestionResponseType = {
    category: string;
    type: string;
    difficulty: DIFFICULTY;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type QuestionType = {
    category: string;
    type: string;
    difficulty: DIFFICULTY;
    question: string;
    correct_answer: string;
    answers: string[];
}

export enum DIFFICULTY {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

/**
 * Fetch questions from the api
 * @param amount Amount of questions to fetch from the api
 * @param difficulty Difficulty of the questions, each question will have random difficulty if not passed
 * @param categoryID ID of the category for questions, each question will have a random category if not provided
 * @returns Array of QuestionType if request fails returns status code of the request
 */
export default async function fetchQuestions(amount: number, difficulty?: DIFFICULTY, categoryID?: number) {
    let endpoint:string = 'https://opentdb.com/api.php?';
    const query = { amount, difficulty, category: categoryID };

    // converting query from object to url parameters
    endpoint += querystring.stringify(query);

    const response = await fetch(endpoint);
    if (!response.ok) return response.status
    
    const jsonRes = await response.json();

    const questions = jsonRes.results.map((question: QuestionResponseType):QuestionType => ({
        question: question.question,
        category: question.category,
        correct_answer: question.correct_answer, 
        difficulty: question.difficulty,
        type: question.type,
        answers: Array.from(shuffleArray([...question.incorrect_answers, question.correct_answer])),
    }));

    return questions;
}

fetchQuestions(10, DIFFICULTY.EASY, 20);