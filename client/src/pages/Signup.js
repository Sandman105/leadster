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
        isemployer: null,
        error: null,
        signedUp: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSignupForm = event => {

        const { firstName, lastName, email, password, isemployer } = this.state;

        event.preventDefault();

        if (firstName === "") 
            return this.setState({ error: "Please put in a user first name." });
        
        if (lastName === "") 
            return this.setState({ error: "Please put in a user last name." });
        
        if (email === "") 
            return this.setState({ error: "Please put in a user email." });
        
        if (password === "") 
            return this.setState({ error: "Please put in a user password." });
        
        if (isNull(isemployer)) 
            return this.setState({ error: "Please select your role." });

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
                            {this.state.error &&
                                !this.state.firstName.length && (
                                    <div className="alert alert-danger my-2">
                                        {this.state.error}
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
                            {this.state.error &&
                                !this.state.lastName.length && (
                                    <div className="alert alert-danger my-2">
                                        {this.state.error}
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
                        {this.state.error &&
                            !this.state.email.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.error}
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
                        {this.state.error &&
                            !this.state.password.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.error}
                                </div>
                            )}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="select" sm={1}>Select</Label>
                    <Col sm={7}>
                        <select
                            // type="select"
                            name="isemployer"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.isemployer}
                            // id="select"
                        >
                            <option value="0" name="isemployer" isemployer="0">Job Seeker</option>
                            <option value="1" name="isemployer" isemployer="1">Employer</option>
                        </select>
                        {this.state.error &&
                            isNaN(this.state.isemployer) && (
                                <div className="alert alert-danger my-2">
                                    {this.state.error}
                                </div>
                            )}
                    </Col>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    };
};

export default Signup;
