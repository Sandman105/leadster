import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
//import { NavLink } from 'react-router-dom';
const h1style = {
    color: '#38C9E6',
    fontWeight: '800',
    fontFamily:"'Permanent Marker', cursive",
}

const jumbostyle = {
    background: 'black',

}

const LeadJumbotron = props => {

    return (
        <div>
            <Jumbotron fluid style={jumbostyle}>
                <Container fluid>
                    <h1 className="display-1 text-center" style={h1style}>Leadster</h1>

                </Container>
            </Jumbotron>
        </div>


    );

};

export default LeadJumbotron;