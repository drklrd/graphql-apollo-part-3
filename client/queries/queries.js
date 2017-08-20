import gql from 'graphql-tag';

export const CurrentUser =  gql`
    {
        user {
            id
            email
        }
    }
`;
