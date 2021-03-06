import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { createUser } from '../utils/API';
import { Redirect } from 'react-router-dom';
import { isNull } from 'util';

class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isEmployer: null,
        errorFirstName: null,
        errorLastName: null,
        errorEmail: null,
        errorPassword: null,
        signedUp: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSignupForm = event => {

        const { firstName, lastName, email, password, isEmployer } = this.state;

        event.preventDefault();

        if (firstName === "") 
            this.setState({ errorFirstName: "Please put in a user first name." });
        
        if (lastName === "") 
            this.setState({ errorLastName: "Please put in a user last name." });
        
        if (email === "") 
            this.setState({ errorEmail: "Please put in a user email." });
        
        if (password === "") 
            this.setState({ errorPassword: "Please put in a user password." });

        if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
            createUser(this.state)
                .then(
                    (response) => {
                        if (response) {
                            return this.setState({signedUp: true});
                        } else {
                            return false;
                        }
                    }
                );
        }
    };

    render() {
        console.log(this.state)
        if (this.state.signedUp) {
            return <Redirect to='/login'/>
        }
        
        return (
            <Form onSubmit={this.handleSignupForm}>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="first-name">First Name</Label>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                onChange={this.handleInputChange}
                                value={this.state.firstName}
                                name="firstName"
                            />
                            {this.state.errorFirstName &&
                                !this.state.firstName.length && (
                                    <div className="alert alert-danger my-2">
                                        {this.state.errorFirstName}
                                    </div>
                                )}
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="last-name">Last Name</Label>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                onChange={this.handleInputChange}
                                value={this.state.lastName}
                                name="lastName"
                            />
                            {this.state.errorLastName &&
                                !this.state.lastName.length && (
                                    <div className="alert alert-danger my-2">
                                        {this.state.errorLastName}
                                    </div>
                                )}
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Label for="email" sm={1}>Email</Label>
                    <Col sm={7}>
                        <Input
                            type="text"
                            className="form-control"
                            placeholder="Email"
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
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={1}>Password</Label>
                    <Col sm={7}>
                        <Input
                            type="password"
                            className="form-control"
                            placeholder="Password"
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
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="select" sm={1}>Select</Label>
                    <Col sm={7}>
                        <select
                            // type="select"
                            name="isEmployer"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.isEmployer}
                            // id="select"
                        >
                            <option value="0" name="isEmployer" isEmployer="0">Job Seeker</option>
                            <option value="1" name="isEmployer" isEmployer="1">Employer</option>
                        </select>
                    </Col>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    };
};

export default Signup;
