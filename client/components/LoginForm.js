import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { Login, CurrentUser } from '../queries/queries';
import { graphql } from 'react-apollo';

class LoginForm extends Component{

    onSubmit({ email, password }){
        this.props.mutate({
            variables : { email, password},
            refetchQueries : [{
                query : CurrentUser
            }]
        })
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)} />
            </div>

        );
    }
}

export default graphql(Login)(LoginForm);
