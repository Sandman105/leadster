import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';

//import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (

            <>
                <Jumbotron>

                </Jumbotron>

                <div className={"text-center"}>
                    <a href="/login"><button>Sign In</button></a>
                    <a href="/signup"><button>Sign Up</button></a>
                </div>
            </>
        )
    }
}




export default Home;