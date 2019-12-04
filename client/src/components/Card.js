import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const CardForm = () => {

    return (
        <div>

            <Card body className="text-center">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
            </Card>

        </div>


    );

};



export default CardForm;