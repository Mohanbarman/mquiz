import ResultModel from '../../models/resultModel';

const getResult = async (parent: any) => {
    const results = await ResultModel.find().populate('user').exec();
    return results;
}

export default getResult;