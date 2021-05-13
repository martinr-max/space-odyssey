import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Filters from './components/filters/Filter.component';
import MyNavBar from './navigation/navBar/NavBar.component';
import Footer from './components/footer/Footer.component';
import Reservations from './components/reservations/Reservations.component';
import SearchForm from './components/searchForm/SearchForm.component';
import RegistretionForm from './components/login/Registration/RegistrationForm.component';

function App() {
  return (
    <Container className="App">
      <Router>
      <MyNavBar />
        <Route path="/" exact component={SearchForm} />
        <Route path="/results" component={Filters} />
        <Route path="/reservForm" component={RegistretionForm} />
        <Route path="/userReservations" component={Reservations} />

        <Footer />
      </Router>
    </Container>
  );
}

export default App;
