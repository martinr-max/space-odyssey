import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toLocalTime } from '../searchResults/SearchResults.component';
import "./Reservations.style.scss";


export default function Reservations() {
  
    let reserv = useSelector(state => state.searchResults.savedBookings);
    let reservations = reserv.map(r => r.reduce((firstArr, secondArr) => firstArr + secondArr));

return(
    <Container style={{backgroundColor: "black"}}>
     {reservations && reservations.length ?
      reservations.map(r => {
       return <Card key={r.reservationId} className="reservationform-card">
                <div className="reservationform-body">
                <div className="reserv-user-info">
                    <h5>User Info: </h5>
                    <p><strong>Name: </strong>{r.user.firstName} {r.user.lastName}</p>
                    <p><strong>Email: </strong>{r.user.email} </p>
                    </div>
                    <Card.Header className="reservationHeader">
                        <h5 style={{padding: "13px"}}>Bookings: </h5>
                        <div className="spacer"></div>
                        <h5 style={{padding: "13px"}}>Total Fare: $ {r.total} </h5>
                    </Card.Header>
                    {r.reserv.map((p ) => {
                         return p.map(array => {
                            return <Card.Body p={array.id} className="flight-info" >
                                <h5>{array.routeInfo.from.name} - {array.routeInfo.to.name}</h5>
                                { array.providers.map(pro => {
                                    return <React.Fragment key={pro.id}>
                                    <p><strong>Company:</strong>  {pro.company.name}</p>
                                    <p> <strong>Price:</strong>  {pro.price}</p>
                                    <p> <strong>Start:</strong> {toLocalTime(pro.flightStart)} </p>
                                    <p> <strong>End:</strong> {toLocalTime(pro.flightEnd)} </p>  
                                    </React.Fragment>
                                })}
                                </Card.Body>
                            })
                        })}
                </div>
            </Card>
        }): null} 
    </Container>
    );
}