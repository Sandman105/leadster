import React, { Component } from 'react';
//import Jumbotron from '../components/Jumbotron'
//import { Link } from "react-router-dom";
import { login } from '../utils/API';
import Form from '../components/Form';
import { Redirect } from 'react-router-dom';
import { isNull } from 'util';

//import { Link } from "react-router-dom";

class Login extends Component {

    state = {
        email: "",
        password: "",
        error: null,
        isEmployer: false,
        loggedIn: false
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
            .then(
                data => {
                    if (!(isNull(data.data.token))){
                        // console.log("works this far");
                        // console.log("Data: ", data);
                        // console.log("token: ", data.data.token);
                        sessionStorage.setItem("jwt", JSON.stringify(data.data.token));
                        sessionStorage.setItem("userId", JSON.stringify(data.data.userInfo.userId));
                        sessionStorage.setItem("isEmployer", JSON.stringify(data.data.userInfo.isEmployer));
                        this.setState({ loggedIn: true });
                        if (data.data.userInfo.isEmployer !== 0) {
                            return this.setState({ isEmployer: true });
                        }
                    }
                }
            );
    };

    render() {
        console.log(this.state)
        if (this.state.isEmployer) {
            return <Redirect to='EmployerPost' />
        } else if (this.state.loggedIn) {
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