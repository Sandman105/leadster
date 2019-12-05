import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { createUser } from '../utils/API';

class Signup extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isEmployer: 0,
        error: null
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

        if (firstName === "") {
            return this.setState({ error: "Please put in a user first name." })
        }
        if (lastName === "") {
            return this.setState({ error: "Please put in a user last name." })
        }
        if (email === "") {
            return this.setState({ error: "Please put in a user email." })
        }
        if (password === "") {
            return this.setState({ error: "Please put in a user password." })
        }
        if (isEmployer !== 0 && isEmployer !== 1 ) {
            return this.setState({ error: "Please select your role." })
        }

        this.createUser(this.state)
            .then(
                data => {
                    sessionStorage.setItem("jwt", data.token);
                    if (this.state.isEmployer === 0) {
                        window.location.href(`/community?userid=${data.id}`);
                    }
                    else {
                        window.location.href(`/employer-posts?userid=${data.id}`);
                    }
                }
            )
    };

    render() {
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
                            type="text"
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
                        <Input
                            type="select"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.isEmployer}
                            id="select"
                        >
                            <option value="0">Job Seeker</option>
                            <option value="1">Employer</option>
                        </Input>
                        {this.state.error &&
                            isNaN(this.state.isEmployer) && (
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