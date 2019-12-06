import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';

class CommunityDetail extends Component {
    state = {}

    static contextType = GlobalContext

    render() {
        console.log(this.context)
        if (this.context.isLoggedIn) {
            return <Redirect to='/login' />
            
        }
        return (
            <>
                <Header>

                </Header>

                <div>
                    <Card>

                    </Card>

                </div>
            </>
        );
    };
};



export default CommunityDetail;