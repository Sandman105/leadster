import React from 'react';
import "./Form.css";
import "./formAnimations.js";

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = props => {
   return ( 
    <Form>
        <div className="form" id="form" style={{ height: '100%' }}>
            <div className="form-toggle" id="form-toggle"></div>
            <div className="form-panel one" id="form-panel-one">
                <div className="form-logo" id="form-logo">
                    <h1>Logo #1</h1>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="form-header">
                    <h1>Account Login</h1>
                </div>
                <div className="form-content">
                    <div>
                        <FormGroup className="form-group">
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" name="username" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" name="password" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label className="form-remember">
                                <Input type="checkbox">Remember Me</Input>
                            </Label><a className="form-recovery" href="#">Forgot Password?</a>
                        </FormGroup>

                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <FormGroup className="form-group">
                            <Button type="submit" id="submit-btn">Log In</Button>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Button type="url" id="sign-up-btn">Sign Up</Button>
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className="form-panel two" id="form-panel-two">
                <div className="form-logo" id="form-logo">
                    <h1>Logo #2</h1>
                </div>

                <div className="form-header">
                    <h1>Register Account</h1>
                </div>
                <div className="form-content">
                    <div>
                        <FormGroup className="form-group">
                            <Label for="first name">First Name</Label>
                            <Input type="text" id="username" name="firstname" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="last name">Last Name</Label>
                            <Input type="text" id="username" name="lastname" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="email">Email Address</Label>
                            <Input type="email" id="email" name="email" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="phone number">Phone Number</Label>
                            <Input type="tel" id="phone-number" name="phonenumber" maxlength="15" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" name="username" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" name="password" maxlength="30" required="required"></Input>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="cpassword">Confirm Password</Label>
                            <Input type="password" id="cpassword" name="cpassword" maxlength="30" required="required"></Input>
                        </FormGroup>


                        <div className="form-group">
                            <Button type="submit">Register</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
   );
};

export default LoginForm;