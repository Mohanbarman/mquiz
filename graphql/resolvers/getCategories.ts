import CategoryModel from '../../models/categoryModel';


const getCategories = async () => {
    try {
        const categories = await CategoryModel.find();
        return categories;
    } catch (e) {
        throw new Error(e);
    }
}

export default getCategories;