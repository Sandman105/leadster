import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { createSubscription } from "../utils/API.js";

const CardForm = ({ title, description, id }) => {

    const userId = sessionStorage.getItem('userId')

    const handleSavePost = (userId, postingID) => {
        console.log("card.js -- 8 -->", postingID);
        console.log("card.js -- 9 -->", userId);
        createSubscription(postingID, userId).then(console.log("API successful")).catch(err => {console.log("err: ", err)});
    };

    return (
        <div>
            <Card body className="text-center" id={id}>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <Button id={id} value={id} onClick={e => handleSavePost(userId,  e.target.value)}>Save</Button>
            </Card>
        </div>
    );
};

export default CardForm;
