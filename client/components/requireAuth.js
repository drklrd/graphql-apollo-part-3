import React , { Component } from 'react';
import { graphql } from 'react-apollo';
import { CurrentUser } from '../queries/queries';
import { hashHistory } from 'react-router';

class RequireAuth extends Component {

    componentDidMount(){
        if(!this.props.data.loading && !this.props.data.user){
            hashHistory.push('/login');
        }
    }
}

export default graphql(CurrentUser)(RequireAuth);
