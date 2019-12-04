import React from 'react';

const Row = props => {

    return (
        <div className={props.helper ? `row ${props.helper}` : 'row'}>
            {props.children}
        </div>
    );

};

export default Row;