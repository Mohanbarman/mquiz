import { Schema, model, Document } from 'mongoose';

interface IResult extends Document {
    name: string;
    category: string;
    difficulty: string;
    totalQuestions: number;
    rightQuestions: number;
    createdAt: string;
}

const resultSchema = new Schema({
    name: String,
    category: String,
    difficulty: String,
    totalQuestions: Number,
    rightQuestions: Number,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
});

export default model<IResult>('results', resultSchema);