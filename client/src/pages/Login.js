import React, { Component } from 'react';
//import Jumbotron from '../components/Jumbotron'
//import { Link } from "react-router-dom";
import { login } from '../utils/API';
// import Form from '../components/Form';
import { Redirect } from 'react-router-dom';

//import { Link } from "react-router-dom";

class Login extends Component {

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
                    if (sessionStorage.getItem('isEmployer') === "1") {
                        this.setState({ isEmployer: true });
                        this.setState({ loggedIn: true });
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
        if (this.state.isEmployer === true && this.state.loggedIn === true) {
            return <Redirect to='EmployerPosts' />
        } else if (this.state.isEmployer !== true && this.state.loggedIn === true) {
            return <Redirect to='Community' />
        }
        return (
            <>
                <input
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
                    type="button"
                    className={"btn btn-success btn-sm"}
                    onClick={this.handleLogInForm}
                >
                </button>
            </>
        )
    }
}

export default Login;