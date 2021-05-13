import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './Lastpage.style.scss';
import { FaSpaceShuttle } from "react-icons/fa";



export default function LastPage() {
    return(
        <Container style={{position: "absolute"}}>
            <Card className="lastPageCard">
                <Card.Body>
                    <FaSpaceShuttle /> <h5> Your reservations are saved! </h5>
                </Card.Body>
            </Card>
        </Container>
    );
}