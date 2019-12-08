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
        error: null,
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
                        this.setState({ loggedIn: true });
                    // }
                }
            }
            ).catch(err => {
                console.log("err: ", err);
                this.setState({ error: "Failed to login!" });
            });
    };

    render() {
        let isLoggedIn = sessionStorage.getItem('isLoggedIn');
        let isEmployer = sessionStorage.getItem('isEmployer');
        // console.log("state: ", this.state);
        // console.log("context: ", this.context);
        // console.log("context emp: ", this.context.user.isEmployer);
        console.log("logged in: ", isLoggedIn);
        console.log("employer: ", isEmployer);
        if (parseInt(isEmployer) === 1 && isLoggedIn === "true") {
            return <Redirect to='employer-posts' />
        } else if (parseInt(isEmployer) !== 1 && isLoggedIn) {
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
