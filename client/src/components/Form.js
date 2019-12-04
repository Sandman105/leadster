import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = props => {

    return (
        <Form>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="username" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password" />
            </FormGroup>
            <Button>Login</Button>
        </Form>



    );

};


export default LoginForm;