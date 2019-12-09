import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'


const CardForm = ({ title, href }) => {

    return (
        <div>
            <Card body className="text-center">
                <CardTitle><Link to={href}>{title}</Link></CardTitle>
            </Card>
        </div>
    );
};

export default CardForm;
