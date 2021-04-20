import ResultModel from '../../models/resultModel';

const getResult = async (parent: any) => {
    const results = await ResultModel.find().exec();
    return results;
}

export default getResult;