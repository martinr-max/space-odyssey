import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import { Container, Button, Alert } from 'react-bootstrap';
import "./SearchResults.style.scss";
import moment from 'moment';
import {default as UUID} from "node-uuid";
import  propTypes  from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

export const toLocalTime = (datetime) => {
  return new Date(datetime)
    .toLocaleTimeString(navigator.language, {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
}

export const now = toLocalTime(moment());


function SearchResults() {

  const [alert, setAlert] = useState(false);
  const searchResults =useSelector(state=> state.searchResults.filteredResults);
  const validUntil = useSelector(state=> state.searchResults.validUntil);

  const dispatch = useDispatch()
  const bookTicket = (providerId) => {
    setAlert(true)
    let reservations = searchResults.reduce((newArray, {
      id,
      routeInfo,
      providers
    }) => {
      let reservationId = UUID.v4();
      let filteredProviders = providers.filter(({
        id
      }) => id === providerId);
      if (filteredProviders && filteredProviders.length)
        newArray.push({
          id,
          routeInfo,
          reservationId: reservationId,
          providers: [...filteredProviders]
        });
      return newArray;
      
    }, []);
      dispatch({type: "bookTicket", reservations: reservations})
      
  }
  
  return(
    <React.Fragment>
      { searchResults && searchResults.length !== 0 ?
        <Container className="searchContainer">
           {alert ?
              <Alert variant="success">
                Booking was successful. To see your bookings:  <Alert.Link href="/reservForm">Bookings</Alert.Link>
              </Alert> : null}
          {searchResults.map( route => {
            return route.providers.map(pro => {
              return <Card key={pro.id} className="result_card">
                 <Card.Body className="search_body">
                  <Card.Header>
                   <h4>{route.routeInfo.from.name} - {route.routeInfo.to.name}</h4>
                  </Card.Header>
                     <p><strong>Company:</strong>  {pro.company.name}</p>
                     <p> <strong>Price:</strong>  {pro.price}</p>
                     <p> <strong>Start:</strong> {toLocalTime(pro.flightStart)} </p>
                     <p> <strong>End:</strong> {toLocalTime(pro.flightEnd)} </p>  
                     <div className="add_to_card_btn">       
                     <Button
                       type="submit"
                       disabled={now > toLocalTime(validUntil)}
                       onClick={(e) => bookTicket(pro.id)}> 
                       Book a ticket
                     </Button>
                     {now > toLocalTime(validUntil) ? <small> A booking is no longer available  </small>
                     : null }
                     </div>
                  </Card.Body>
              </Card>
            })      
        })}
      </Container>: null }
    </React.Fragment>
  );
}

SearchResults.propTypes = {
  searchResults: propTypes.array,
  validUntil: propTypes.string
}

export default SearchResults