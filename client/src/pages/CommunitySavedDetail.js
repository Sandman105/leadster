import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import GlobalContext from '../components/Global/context';

class CommunitySavedDetail extends Component {
    static contextType = GlobalContext

    render() {
        console.log(this.context)
        if (this.context.isLoggedIn) {
            return <Redirect to='/login' />
            
        }
        return(
            <Header />
        )
    }
}

export default CommunitySavedDetail;
