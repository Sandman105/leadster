import React, { Component } from 'react';
//import Jumbotron from '../components/Jumbotron'
//import { Link } from "react-router-dom";
import { login } from '../utils/API';
// import Form from '../components/Form';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context'
//import { Link } from "react-router-dom";

class Login extends Component {
    static contextType = GlobalContext
    state = {
        email: "",
        password: "",
        errorEmail: null,
        errorPassword: null,
        errorLogin: null,
        isEmployer: null,
        loggedIn: null
    }

    componentDidMount() {
        //by default we will clear the sessionStorage so when they are redirected here from signing out, we clear all items
        // sessionStorage.clear();
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
            this.setState({ errorEmail: "Please put in a user email." })
        }
        if (password === "") {
            this.setState({ errorPassword: "Please put in a user password." })
        }

        if (email !== "" && password !== "") {
            login(this.state)
                .then(data => {
                    if (data.status === 200) {
                        console.log("Data: ", data);
                        sessionStorage.setItem("jwt", JSON.stringify(data.data.token));
                        sessionStorage.setItem("userId", JSON.stringify(data.data.userInfo.userId));
                        sessionStorage.setItem("isEmployer", JSON.stringify(data.data.userInfo.isEmployer));
                        sessionStorage.setItem("isLoggedIn", true);
                        // console.log("emp check: ", typeof (sessionStorage.getItem('isEmployer')));
                        // const userData = {
                        //     userId: data.data.userInfo.userId,
                        //     isEmployer: data.data.userInfo.isEmployer
                        // }
                        // this.context.setUser(userData);
                        // this.context.user.isEmployer = data.data.userInfo.isEmployer;
                        // this.context.isEmployer = data.data.userInfo.isEmployer;
                        // this.context.isLoggedIn = true;
                        // if (sessionStorage.getItem('isEmployer') === "1") {
                        //     this.setState({ isEmployer: true, loggedIn: true });
                        // } else {
                        this.setState({ 
                            loggedIn: true,
                            isEmployer: sessionStorage.getItem('isEmployer')
                         });
                        // }
                    }
                }
                ).catch(err => {
                    console.log("err: ", err);
                    this.setState({ errorLogin: "Failed to login!" });
                });
        }
    };

    render() {
        console.log("state: ", this.state);
        // console.log("context: ", this.context);
        // console.log("context emp: ", this.context.user.isEmployer);
        console.log("logged in: ", typeof (this.state.loggedIn));
        console.log("employer: ", typeof (this.state.isEmployer));
        if (parseInt(this.state.isEmployer) === 1 && this.state.loggedIn) {
            return <Redirect to='employer-posts' />
        } else if (parseInt(this.state.isEmployer) !== 1 && this.state.loggedIn) {
            return <Redirect to='community' />
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
                {this.state.errorEmail &&
                    !this.state.email.length && (
                        <div className="alert alert-danger my-2">
                            {this.state.errorEmail}
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
                {this.state.errorPassword &&
                    !this.state.password.length && (
                        <div className="alert alert-danger my-2">
                            {this.state.errorPassword}
                        </div>
                    )}
                {this.state.errorLogin &&
                    (
                        <div className="alert alert-danger my-2">
                            {this.state.errorLogin}
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
