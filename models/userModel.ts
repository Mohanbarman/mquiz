import { model, Schema, Document } from 'mongoose';


interface IUser extends Document {
    id: string;
    name: string;
}

const userSchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
});

export default model<IUser>('users', userSchema);