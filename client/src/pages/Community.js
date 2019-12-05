import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { getAllPostings } from "../utils/API.js";

class Community extends Component {
    state = {}

    componentDidMount() {
        getAllPostings
        .then(res => {
            
        });
      }

    render() {
        return (
            <>
                <Header>

                </Header>
                <div>
                    <Card />
                    <Card />
                </div>
            </>
        )
    }
}

export default Community;

