import { gql } from '@apollo/client';

export const createUser = gql`
    mutation CREATE_USER($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`