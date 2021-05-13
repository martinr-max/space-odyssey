import React, {useState, useEffect  } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import { Redirect } from 'react-router-dom';
import CustomJumbotron from '../../components/UI/Carousel/Jumbotron';
import './SearchForm.style.scss';


export default function SearchForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [depature, setDepature] = useState([]);
  const [destination, setDestination] = useState([]);
  const [fetchedRoutes, setRoutes] = useState();
  const [searchedResults, setSearchedResults] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [validUntil, setValidUntil] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    try {
      const fetchRoutes = async () => {
        setIsLoading(true);
        const fetchedData = await fetch("https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices");
        const routes = await fetchedData.json();
        setValidUntil(routes.validUntil);
        setRoutes(routes.legs);
        sessionStorage.setItem('availableRoutes', JSON.stringify(routes))
        setIsLoading(false);
      }
      fetchRoutes();
    } catch (err) {
      setError(err.message);
    }
  }, [])

  const handleSearch = () => {
    if (fetchedRoutes.length !== 0) {
      let unique = fetchedRoutes.map(item => (item.routeInfo.to.name))
        .filter((value, index, self) => self.indexOf(value) === index)
      let options = unique.map((route) => ({
        depature: route,
        destination: route,
      }));
      if (options.length !== 0) {
        setOptions(options);
      }
    }
  };

  const saveResults = (event) => {
    event.preventDefault();
    if (depature.length === 0 || destination.length === 0) {
      return;
    }
    const results = fetchedRoutes.filter(route => {
      return route.routeInfo.from.name === depature[0].depature &&
        route.routeInfo.to.name === destination[0].destination
    })
    if (results.length === 0) {
      setAlert(true);
      setRedirect(false);
      return;
    } else {
      setSearchedResults(results)
      setRedirect(true);
    }
  }

  const filterBy = () => true;

  return(
    <Container>
      <CustomJumbotron>
      {alert ?
      <Alert variant="info" className="customAlert">
        <h5>No results was found</h5>
      </Alert> : null }
      <Form className="searchForm" onSubmit={saveResults}>
        <Form.Group >            
          <AsyncTypeahead
            id="depature_input"
            filterBy={filterBy}
            isLoading={isLoading}
            labelKey="depature"
            minLength={3}
            onSearch={handleSearch}
            onChange={setDepature}
            selected={depature}
            options={options}
            placeholder="Search for a depature..."
          />
        </Form.Group>
        <Form.Group>
          <AsyncTypeahead
            id="destination_input"
            filterBy={filterBy}
            isLoading={isLoading}
            labelKey="destination"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a destination..."
            onChange={setDestination}
            selected={destination}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Start Your Odyssey!
        </Button>
      </Form>
        {redirect && !error &&
            <Redirect to={{
              pathname: '/results',
              state: { results: searchedResults, validUntil: validUntil }
            }} />
        }  
      </CustomJumbotron>
    </Container>          
  );
}