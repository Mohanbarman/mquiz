import { gql } from '@apollo/client';


export const GET_CATEGORIES = gql`
    query GET_CATEGORIES {
        getCategories {
            id
            name
        }
    }
`