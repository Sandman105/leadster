import React, { Component } from 'react';
import { login } from '../utils/API';
//import { Link } from "react-router-dom";

class Login extends Component {

    state = {
        email: "",
        password: ""
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
        login(email, password)
        .then(
            token => {
                sessionStorage.setItem("jwt", token);
            }
        )
    };

    render() {
        return (
            <form onSubmit={this.handleLogInForm}>
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
                    type="submit"
                    className={'btn btn-success btn-sm'}
                >
                </button>
            </form>
        )
    }
}

export default Login;