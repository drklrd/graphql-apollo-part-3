import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { Login, CurrentUser } from '../queries/queries';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            errors : []
        };
    }

    componnentWillUpdate(nextProps){
        // this.props // the old , current set of props
        // nextProps // the next set of props that will be in place when the component rerenders
        if(!this.props.data.user && nextProps.data.user){
            // redirect to dashboard !!!
            hashHistory.push('/dashboard');
        }
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

export default graphql(CurrentUser)(
graphql(Login)(LoginForm)
);
