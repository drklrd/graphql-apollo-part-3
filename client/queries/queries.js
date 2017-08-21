import gql from 'graphql-tag';

export const CurrentUser =  gql`
    {
        user {
            id
            email
        }
    }
`;

export const Logout = gql`
    mutation {
        logout{
            id
            email
        }
    }
`;
