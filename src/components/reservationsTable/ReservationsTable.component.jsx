import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { toLocalTime } from '../searchResults/SearchResults.component';
import  propTypes  from 'prop-types';
import "./ReservationsTable.style.scss";


export default function ReservationsTable({
   saveReservation,
   deleteResevation,
   reservations,
   total,
   validated }) {  

  return(
    <Container style={{backgroundColor: "black", paddingBottom: "20px"}}>
        <div className="reservation_header">
          <h4 className="tickets">Your  Tickets:  </h4>
          <div className="spacer"></div>
            <div className="resevation_header_right">
              <h4 className="total_price"> Total Fare: $ {total} </h4>
              <Button disabled={!validated} type="submit" onClick={saveReservation}>
                Save Reservations
              </Button>
            </div>
        </div>
        { reservations && reservations.length !== 0 ?
        <div> {reservations.map(reserv => {
          return reserv.map(m => {
            return <Card key={m.id} className="result_card">
                 <Card.Body className="search_body">
                 <Card.Header>
                   <h4>{m.routeInfo.from.name} - {m.routeInfo.to.name}</h4>
                </Card.Header>
                {m.providers.map(pro => {
                  return <div key={pro.id} style={{display: "contents"}}>
                     <p><strong>Company:</strong>  {pro.company.name}</p>
                     <p> <strong>Price:</strong>  {pro.price}</p>
                     <p> <strong>Start:</strong> {toLocalTime(pro.flightStart)} </p>
                     <p> <strong>End:</strong> {toLocalTime(pro.flightEnd)} </p>  
                     <Button className="btn btn-danger" onClick={() => deleteResevation(m.reservationId)}> Remove booking </Button>
                    </div>
                })} 
              </Card.Body>
            </Card>
          })
        })} 
        </div>: <h5 className="no_booking_statement"> No bookings was found</h5> }
    </Container>
  );
}

ReservationsTable.propTypes = {
  saveReservation: propTypes.func,
  deleteResevation: propTypes.func,
  total: propTypes.number,
  validated: propTypes.bool
}