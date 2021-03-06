import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Jumbotron.styles.scss';

export default function CustomJumbotron(props) {
    return(
        <React.Fragment>
                <Jumbotron className="jumbotron">
                    {props.children}
                </Jumbotron>   
        </React.Fragment>        
    );
}
