import React from 'react';
import { Container, Form } from 'react-bootstrap';
import './RegistrationForm.style.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {default as UUID} from "node-uuid";
import ReservationsTable from '../../../components/reservationsTable/ReservationsTable.component';
import { useDispatch, useSelector } from 'react-redux';


const findFareTotal = (query) => {
  const reducer = (firstArr, secondArr) => firstArr + secondArr;
  if (query.length !== 0) {
    let prices = query.map(p => {
      return p.map(r => {
          return r.providers.map(p => {
              return p.price
            })
            .reduce(reducer)
        })
        .reduce(reducer)
    })
    let total = prices.reduce(reducer);
    return total;
  } 
}

export default function RegistretionForm() {

  const [user, setUser] = useState({firstName: "",lastName: "",email: ""});
  const [validated, setValidated] = useState(false);
  const [isValid, setIsvalid] = useState(false);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  const reservations = useSelector(state => state.searchResults.addedBookings);
  const dispatch = useDispatch()

  const handleChange = (event) => { 
    setUser(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));    
  }
  
  useEffect(() =>{
    let findTotal = findFareTotal(reservations)
    setTotal(findTotal);
  }, [reservations])
 
   
  const deleteResevation =  (reservationId) => {
    dispatch({type: "removeBooking", reservationId: reservationId  })
  }

  
  const saveReservation = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (user.firstName &&
        user.lastName &&
        user.email !== ""
    ) {
      setIsvalid(true);
    }
    const reservationId = UUID.v1()
    const savedReservations =[{
      reserv: reservations,
      user: user,
      total: total,
      reservationId: reservationId
    }]
    if(validated && isValid && total && total !== 0) {
      dispatch({type: "saveBookings", savedReservations: savedReservations})
      history.push('/lastPage');
     
    }
  }

  return(
    <Container>

      <Form className="customForm" noValidate validated={validated}>
        <h4 className="form-title"> User Details: </h4>
          <Form.Group className="custom_formGroup" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              minLength={3}
              type="text"
              name="firstName"
              value={user.firstName}
              placeholder="Enter your first name"
              onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                A name is required
              </Form.Control.Feedback>
            </Form.Group>
          <Form.Group className="custom_formGroup" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              required
              minLength={3}
              type="text"
              value={user.lastName}
              placeholder="Enter your last name"
              onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                A last name is required
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="custom_formGroup" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              minLength={3}
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                A email is required
              </Form.Control.Feedback>        
            </Form.Group>
        </Form>
        <ReservationsTable 
        reservations = {reservations}
        deleteResevation={deleteResevation}
        saveReservation={saveReservation}
        total={total}
        validated={validated}
      />
    </Container> 
  );
}