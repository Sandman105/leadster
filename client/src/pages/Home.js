import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';

//import { Link } from "react-router-dom";

const homeButton = {

    backgroundColor: '#666666',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Righteous', cursive",
    margin: '4px 2px',
    cursor: 'pointer',
}


class Home extends Component {
    render() {
        return (

            <>
                <Jumbotron>

                </Jumbotron>

                <div className={"text-center"}>
                    <a href="/login"><button style={homeButton}>Sign In</button></a>
                    <a href="/signup"><button style={homeButton}>Sign Up</button></a>
                </div>
            </>
        )
    }
}




export default Home;