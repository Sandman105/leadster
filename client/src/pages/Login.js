import React, { Component } from 'react';
//import Jumbotron from '../components/Jumbotron'
//import { Link } from "react-router-dom";
import { login } from '../utils/API';
// import Form from '../components/Form';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context'
import { Col } from 'reactstrap';

//import { Link } from "react-router-dom";

const loginButton = {

    backgroundColor: '#666666',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '5px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Righteous', cursive",
    margin: '4px 2px',
    cursor: 'pointer',
}

const formLabel = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

class Login extends Component {

    static contextType = GlobalContext

    state = {
        email: "",
        password: "",
        error: null,
        isEmployer: null,
        loggedIn: null
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleLogInForm = event => {
        const { email, password } = this.state;
        event.preventDefault();

        if (email === "") {
            return this.setState({ error: "Please put in a user email." })
        }
        if (password === "") {
            return this.setState({ error: "Please put in a user password." })
        }

        login(this.state)
            .then(data => {
                if (data.status === 200) {
                    console.log("Data: ", data);
                    sessionStorage.setItem("jwt", JSON.stringify(data.data.token));
                    sessionStorage.setItem("userId", JSON.stringify(data.data.userInfo.userId));
                    sessionStorage.setItem("isEmployer", JSON.stringify(data.data.userInfo.isEmployer));
                    console.log("emp check: ", typeof (sessionStorage.getItem('isEmployer')));

                    const userData = {
                        userId: data.data.userInfo.userId
                    }
                    this.context.setUser(userData)
                    if (sessionStorage.getItem('isEmployer') === "1") {
                        this.setState({ isEmployer: true, loggedIn: true });

                    } else {
                        this.setState({ loggedIn: true });
                    }
                }
            }
            ).catch(err => {
                console.log(err);
                this.setState({ error: "Failed to login!" });
            });
    };

    render() {
        console.log(this.state)
        console.log(this.context)
        if (this.state.isEmployer === true && this.state.loggedIn === true) {
            return <Redirect to='EmployerPosts' />
        } else if (this.state.isEmployer !== true && this.state.loggedIn === true) {
            return <Redirect to='Community' />
        }
        return (

            <Col md={8}>
                <input
                    style={formLabel}
                    type="text"
                    className="form-control"
                    placeholder="User Email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    name="email"
                />
                {this.state.error &&
                    !this.state.email.length && (
                        <div className="alert alert-danger my-2">
                            {this.state.error}
                        </div>
                    )}
                <input
                    style={formLabel}
                    type="text"
                    className="form-control"
                    placeholder="User Password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    name="password"
                />
                {this.state.error &&
                    !this.state.password.length && (
                        <div className="alert alert-danger my-2">
                            {this.state.error}
                        </div>
                    )}
                <button
                    style={loginButton}
                    type="button"
                    className={"btn btn-success btn-sm"}
                    onClick={this.handleLogInForm}
                >
                    Login
                </button>
            </Col>
        )
    }
}

export default Login;