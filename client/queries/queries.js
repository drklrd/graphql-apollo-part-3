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

export const Login = gql`

    mutation Login($email : String, $password: String){
        login(email : $email, password : $password){
            id
            email
        }
    }
`;
