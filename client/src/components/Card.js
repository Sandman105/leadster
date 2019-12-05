import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


const Card = ({ title, href}) => {

    return (
        <div>
            <Card body className="text-center">
                <CardTitle><a href={href}>{title}</a></CardTitle>
            </Card>
        </div>
    );
};

export default Card;
