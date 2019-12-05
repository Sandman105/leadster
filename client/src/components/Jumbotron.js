import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
//import { NavLink } from 'react-router-dom';


const LeadJumbotron = props => {

    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-1 text-center">Leadster</h1>

                </Container>
            </Jumbotron>
        </div>


    );

};

export default LeadJumbotron;