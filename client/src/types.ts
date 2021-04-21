export type QuestionType = {
    id: string;
    category: CategoryType;
    type: string;
    difficulty: DIFFICULTY;
    question: string;
    correctAnswer: string;
    answers: string[];
}

export enum DIFFICULTY {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

export type CategoryType = {
    id: number;
    name: string;
}