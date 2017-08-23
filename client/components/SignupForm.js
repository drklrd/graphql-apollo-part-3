import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { Signup, CurrentUser } from '../queries/queries';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class SignupForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            errors : []
        };
    }

    componentWillUpdate(nextProps){

        if(nextProps.data.user && !this.props.data.user){
            // redirect to dashboard !!!
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables : { email, password },
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
                <h3>Sign Up</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>

        );
    }
}

export default graphql(CurrentUser)(
    graphql(Signup)(SignupForm)
);
