import React, { Component } from 'react';
import Header from '../components/Header';
import getPostingByEmployer from '../utils/API';

// import { Link } from "react-router-dom";


class EmployerPosts extends Component {
    state = {
        jobList: []
    }

    componentDidMount = () => {
        getPostingByEmployer
    }


    render() {
        return (
            <Header>
                
            </Header>
            
        )
    }
}







export default EmployerPosts;