import QuestionModel from '../../models/questionModel';

type QuestionInputType = {
    amount: number;
    categoryID: number;
    difficulty?: 'easy' | 'hard' | 'medium';
}

const getQuestions = async (parent: any, { input }: { input: QuestionInputType }) => {
    try {
        const questions = await QuestionModel.find(input.amount, input.difficulty, input.categoryID);
        return questions;
    } catch (e) {
        throw new Error(e);
    }
}

export default getQuestions;