import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

const cardText = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

const CardForm = ({ title, href}) => {

    return (
        <div>
            <Card body className="text-center" style={cardText}>
                <CardTitle><a href={href}>{title}</a></CardTitle>
            </Card>
        </div>
    );
};

export default CardForm;
