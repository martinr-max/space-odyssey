import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Filters from './components/filters/Filter.component';
import Footer from './components/footer/Footer.component';
import Reservations from './components/reservations/Reservations.component';
import LastPage from './components/lastPage/LastPage.component';
import SearchForm from './pages/searchForm/SearchForm.component';
import RegistretionForm from './pages/registration/RegistrationForm/RegistrationForm.component';
import CustomNavbar from './components/navigation/navbar/Navbar.component';

function App() {
  return (
    <Container className="App">
      <Router>
      <CustomNavbar />
        <Route path="/" exact component={SearchForm} />
        <Route path="/results" component={Filters} />
        <Route path="/reservForm" component={RegistretionForm} />
        <Route path="/userReservations" component={Reservations} />
        <Route path="/lastPage" component={LastPage} />
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
