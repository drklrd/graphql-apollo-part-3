import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { Login, CurrentUser } from '../queries/queries';
import { graphql } from 'react-apollo';

class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            errors : []
        };
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables : { email, password},
            refetchQueries : [{
                query : CurrentUser
            }]
        })
        .catch(err => {
            const errors = err.graphQLErrors.map(error => error.message);
            this.setState({
                errors
            });
        });
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>

        );
    }
}

export default graphql(Login)(LoginForm);
