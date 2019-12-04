import React, { Component } from 'react';
//import { Link } from "react-router-dom";

class Home extends Component {
    redner () {
        <>
            <a href="/login"><button>Sign In</button></a>
            <a href="/signup"><button>Sign Up</button></a>
        </>
    }
}



export default Home;