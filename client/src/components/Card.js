import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'

const cardText = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

const postLink = {
    color: 'black'
}

const CardForm = ({ title, href, status }) => {

    return (
        <div>

            <Card body className="text-center" style={cardText}>
                <CardTitle><Link style={postLink} to={href}>{title} -- Status: {status === 0 ? "Open" : "Closed"}</Link></CardTitle>
            </Card>
        </div>
    );
};

export default CardForm;
