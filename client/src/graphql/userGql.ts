import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CREATE_USER($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`