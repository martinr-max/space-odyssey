import React from 'react';
import { Form } from 'react-bootstrap';
import './RegistrationForm.style.scss';
import ReservationForm from '../../reservationForm/ReservationForm.component';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {default as UUID} from "node-uuid";


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
  const [total, setTotal] = useState("");
  const [reservations, setReservations] = useState();
  const history = useHistory();

  const handleChange = (event) => {
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setUser(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    setValidated(true);

  }
   
  useEffect(() => {
    const fetchedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(fetchedReservations);
  }, [])
  
  useEffect(() => {
    if (reservations) {
      setTotal(findFareTotal(reservations));
    }
  }, [reservations])
  
 
  
  const deleteResevation = (reservationId) => {
    const oldArray = localStorage.getItem('reservations') ? localStorage.getItem('reservations') : "[]";
    const reservationsArray = JSON.parse(oldArray);
    let deletedBooking = reservationsArray.map(r => r.filter(m => m.reservationId !== reservationId))
    reservationsArray.splice(deletedBooking, 1);
    localStorage.setItem("reservations", JSON.stringify(reservationsArray));
    setReservations(reservationsArray);
  }
  
  const saveReservation = (event) => {
    event.preventDefault();
    if ( reservations.length === 0) {
      return;
    }
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
        localStorage.removeItem('reservations');
        history.push('/userReservations');
      } else {
        localStorage.setItem('savedReservations', JSON.stringify(saveReservation));
        localStorage.removeItem('reservations');
        history.push('/userReservations');
      }
    }
  }
 

   
    return(
      <React.Fragment>
        <Form className="customForm" noValidate validated={validated}>
          <h4 className="form-title"> User Details: </h4>
          <Form.Group className="custom_formGroup" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              minLength={3}
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange} />
              
            </Form.Group>
          <Form.Group className="custom_formGroup" controlId="lastName">
  
    <Form.Label>Last Name</Form.Label>
    <Form.Control
    name="lastName"
     required
     minLength={3}
     type="text"
     placeholder="lastname"
     onChange={handleChange} />
  </Form.Group>
  <Form.Group className="custom_formGroup" controlId="firstName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              minLength={3}
              type="email"
              name="email"
              unique
              placeholder="Enter your Email"
              onChange={handleChange} />
            </Form.Group>
</Form>
<ReservationForm 
reservations = {reservations}
deleteResevation={deleteResevation}
saveReservation={saveReservation}
total={total}
validated={validated}
 />
</React.Fragment>
 
);
}