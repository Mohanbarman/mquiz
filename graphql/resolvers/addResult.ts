import { UserInputError } from 'apollo-server-errors';
import ResultModel from '../../models/resultModel';
import UserModel from '../../models/userModel';

type ResultInputType = {
    category: string;
    difficulty: string;
    totalQuestions: number;
    rightQuestions: number;
    userID: string;
}

const addResult = async (_: any, { resultInput }: { resultInput: ResultInputType }) => {
    const user = await UserModel.findById(resultInput.userID).exec();
    if (!user) throw new UserInputError("User with this ID doesn't exists");

    const result = new ResultModel({
        category: resultInput.category,
        difficulty: resultInput.difficulty,
        totalQuestions: resultInput.totalQuestions,
        rightQuestions: resultInput.rightQuestions,
        user: user.id,
    });

    try { await result.save() }
    catch (e) { throw new Error(e) }

    const res = await result.populate('user').execPopulate();
    return res;
}

export default addResult;