import { gql } from '@apollo/client';

export const ADD_RESULT = gql`
    mutation ADD_RESULT($category: String!, $userID: String!, $difficulty: String!, $totalQuestions: Int!, $rightQuestions:Int!) {
        addResult(resultInput: {
            category: $category,
            userID: $userID,
            difficulty: $difficulty,
            totalQuestions: $totalQuestions,
            rightQuestions: $rightQuestions,
        }) {
            id
            user { id name }
            totalQuestions
            rightQuestions
            category
            createdAt
        }
    }
`

export const GET_RESULTS = gql`
    query GET_RESULTS {
        getResults {
        id
        user { id name }
        totalQuestions
        rightQuestions
        category
        createdAt
        }
    }
`