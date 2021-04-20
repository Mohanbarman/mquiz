import ResultModel from '../../models/resultModel';

const addResult = async (parent: any, { resultInput }: { resultInput: ResultInputType }) => {
    const result = new ResultModel({
        ...resultInput
    })

    try { await result.save() }
    catch (e) { throw new Error(e) }

    return result;
}

export default addResult;