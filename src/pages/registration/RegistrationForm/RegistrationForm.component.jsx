import React from 'react';
import { Form } from 'react-bootstrap';
import './RegistrationForm.style.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {default as UUID} from "node-uuid";
import ReservationsTable from '../../../components/reservationsTable/ReservationsTable.component';


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

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  
  const [validated, setValidated] = useState(false);
  const [total, setTotal] = useState();
  const [reservations, setReservations] = useState();
  const history = useHistory();

  const handleChange = (event) => {
    setUser(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));

    if(user.lastName
       && user.firstName
       && user.email !== 0 
       && reservations.length !== 0)
      setValidated(true);
  }
   
  useEffect(() => {
    const fetchedReservations = JSON.parse(sessionStorage.getItem("reservations")) || [];
    setReservations(fetchedReservations);
  }, [])
  
  useEffect(() => {
    if (reservations) {
      setTotal(findFareTotal(reservations));
    }
  }, [reservations])
   
  const deleteResevation = (reservationId) => {
    const oldArray = sessionStorage.getItem('reservations') ? sessionStorage.getItem('reservations') : "[]";
    const reservationsArray = JSON.parse(oldArray);
    let deletedBooking = reservationsArray.map(r => r.filter(m => m.reservationId !== reservationId))
    reservationsArray.splice(deletedBooking, 1);
    sessionStorage.setItem("reservations", JSON.stringify(reservationsArray));
    setReservations(reservationsArray);
  }
  
  const saveReservation = (event) => {
    event.preventDefault();
    const reservationId = UUID.v1()
    const saveReservation = [{
      reserv: reservations,
      user: user,
      total: total,
      reservationId: reservationId
    }]
    if (user) {
      const oldArray = localStorage.getItem('savedReservations') ? localStorage.getItem('savedReservations') : "[]";
      if (oldArray.length !== 0) {
        const reservationsArray = JSON.parse(oldArray);
        reservationsArray.push(saveReservation);
        localStorage.setItem('savedReservations', JSON.stringify(reservationsArray));
        history.push('/lastPage');
      } else {
        localStorage.setItem('savedReservations', JSON.stringify(saveReservation));
        history.push('/lastPage');
      }
    }
  }

  return(
    <React.Fragment>
      <Form className="customForm" noValidate validated={validated} onSubmit={saveReservation}>
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
    </React.Fragment> 
  );
}