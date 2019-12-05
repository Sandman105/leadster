import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const CardForm = ({ title, description, id }) => {

    return (
        <div>
            <Card body className="text-center" id={id}>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <Button>Go somewhere</Button>
            </Card>
        </div>
    );
};

export default CardForm;