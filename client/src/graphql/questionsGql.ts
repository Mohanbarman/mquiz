import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
    query GET_QUESTIONS($amount: Int!, $categoryID: Int!, $difficulty: AllowedDifficulty) {
        getQuestions(input: {
            amount: $amount,
            categoryID: $categoryID,
            difficulty: $difficulty
        }) {
            id
            category { id, name }
            type
            difficulty
            question
            correctAnswer
            answers
        }
    }
`