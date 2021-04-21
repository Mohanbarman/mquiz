type QuestionType = {
    id: string;
    category: CategoryType;
    type: string;
    difficulty: DIFFICULTY;
    question: string;
    correctAnswer: string;
    answers: string[];
}

enum DIFFICULTY {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

type CategoryType = {
    id: number;
    name: string;
}