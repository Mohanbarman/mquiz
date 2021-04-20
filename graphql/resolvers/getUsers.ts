import UserModel from '../../models/userModel';

const getUsers = async () => {
    const users = await UserModel.find().exec();
    return users;
}

export default getUsers;