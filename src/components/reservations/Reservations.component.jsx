import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { toLocalTime } from '../searchResults/SearchResults.component';
import "./Reservations.style.scss";


export default function Reservations() {
  
    const [reservations, setReservations] = useState();
    
    useEffect(() => {
      const savedReservations = JSON.parse(localStorage.getItem("savedReservations"));
      let reducedArry = savedReservations.map(r => r.reduce((firstArr, secondArr) => firstArr + secondArr));
      setReservations(reducedArry);
    }, [])

return(
    <Container style={{backgroundColor: "black"}}>
     {reservations && reservations.map(r => {
       return <Card key={r.reservationId} className="reservationform-card">
                <div className="reservationform-body">
                <div className="reserv-user-info">
                    <h4>User Info: </h4>
                    <p><strong>Name: </strong>{r.user.firstName} {r.user.lastName}</p>
                    <p><strong>Email: </strong>{r.user.email} </p>
                    </div>
                    <Card.Header className="reservationHeader">
                        <h4 style={{padding: "13px"}}>Bookings: </h4>
                        <div className="spacer"></div>
                        <h4 style={{padding: "13px"}}>Total Fare: $ {r.total} </h4>
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
        })} 
    </Container>
    );
}