import { UserInputError } from 'apollo-server-errors';
import UserModel from '../../models/userModel';

const createUser = async (parent: any, { name }: { name: string }) => {
    if (!name.trim()) throw new UserInputError("Name must not be empty");
    const user = new UserModel({ name });

    try { await user.save() }
    catch (e) { throw new Error(e) }

    return user;
}

export default createUser;