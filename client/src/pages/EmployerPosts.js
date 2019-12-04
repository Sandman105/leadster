import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import getPostingByEmployer from '../utils/API';

// import { Link } from "react-router-dom";


class EmployerPosts extends Component {
    state = {
        jobList: []
    }

    componentDidMount = () => {
        //getPostingByEmployer
    }


    render() {
        return (
            < >
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







export default EmployerPosts;