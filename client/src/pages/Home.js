import React, { Component } from 'react';
import "../components/Landing-page/Landing-pageAnimations.js";
import "../components/Landing-page/Landing-page.css"
import Form from '../components/Form/Form.js';


//import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (

            <>
                <div className={"sidebar slidein hidden"}>
                <Form>
                </Form>
                </div>

                <div className={"stripe-div"} id={"stripe-div"}>
                    <div>
                        <LeadsterLogo1></LeadsterLogo1>
                        <h2 className={"sign-in-toggle"} id={"parent-form-toggle"}><a>Select Here to Toggle The Form</a></h2>
                    </div>
                </div>

                <div className={"text-center"}>
                    <a href="/login"><button>Sign In</button></a>
                    <a href="/signup"><button>Sign Up</button></a>
                </div>
            </>
        )
    }
}




export default Home;