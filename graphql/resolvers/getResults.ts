import ResultModel from '../../models/resultModel';

const getResult = async () => {
    const results = await ResultModel.find().sort({createdAt: -1}).populate('user').exec();
    return results;
}

export default getResult;