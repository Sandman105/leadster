import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
    state = {}

    render() {
        return (
            <Form>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleEmail">First Name</Label>
                            <Input type="text" placeholder="first name" />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="examplePassword">Last Name</Label>
                            <Input type="text" placeholder="last name" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Label for="exampleEmail" sm={1}>Email</Label>
                    <Col sm={7}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={1}>Password</Label>
                    <Col sm={7}>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleSelect" sm={1}>Select</Label>
                    <Col sm={7}>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Employer</option>
                        <option>Job Seeker</option>
                    </Input>
                    </Col>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    };
};


export default Signup;