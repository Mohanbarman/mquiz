import querystring from 'querystring';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';

import {shuffleArray} from '../utils/shuffleArray';
import CategoryModel from './categoryModel';

type QuestionResponseType = {
    category: string;
    type: string;
    difficulty: DIFFICULTY;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

class QuestionModel {
    /**
     * Fetch questions from the api
     * @param amount Amount of questions to fetch from the api
     * @param difficulty Difficulty of the questions, each question will have random difficulty if not passed
     * @param categoryID ID of the category for questions, each question will have a random category if not provided
     * @returns Array of QuestionType if request fails throws status code of the request
     */
    async find(amount: number, difficulty?: DIFFICULTY | string, categoryID?: number): Promise<QuestionType[]> {
        let endpoint: string = 'https://opentdb.com/api.php?';
        const query = { amount, difficulty, category: categoryID };

        // converting query from object to url parameters
        endpoint += querystring.stringify(query);

        const response = await fetch(endpoint);
        if (!response.ok) throw response.status;

        const jsonRes = await response.json();

        const categories = CategoryModel.find();

        const questions = jsonRes.results.map(async (question: QuestionResponseType): Promise<QuestionType> => ({
            id: uuid(),
            question: question.question,
            category: await CategoryModel.find({name: question.category}) as unknown as CategoryType,
            correctAnswer: question.correct_answer,
            difficulty: question.difficulty,
            type: question.type,
            answers: Array.from(shuffleArray([...question.incorrect_answers, question.correct_answer])),
        }));

        return questions;

    }
}

export default new QuestionModel();