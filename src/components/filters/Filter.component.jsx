import React from 'react';
import { Navbar, Form, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import SearchResults from '../searchResults/SearchResults.component';
import { useReducer } from 'react';
import { useState } from 'react';
import "./Filter.styles.scss";
import { reducer } from '../../filterReducer/FilterReducer.reducer';

function Filters(props) {

  const searchResults = props.location.state.results;
  const validUntil = props.location.state.validUntil;

  const [title, setTitle] = useState("Filters");
  const [state, dispatch] = useReducer(reducer, searchResults);
 
  function  sort_by_price_asc() {
    dispatch({ type: 'sort_by_price_asc'  });
    setTitle("prize low-to-high");
  }

  function sort_by_price_desc() {
    dispatch({ type: 'sort_by_price_desc' });
    setTitle("prize high-to-low");
  }

  function sort_by_time_desc() {
    dispatch({ type: 'sort_by_time_desc' });
    setTitle("Later first");
  }
  
  function sort_by_time_asc() {
    dispatch({ type: 'sort_by_time_asc' });
    setTitle("Earlier first");
  }

  const filter_by_name =( value, query) => {
    dispatch({ type: 'filter_by_name',payload: {value, query}});  
  }

return(
    <Container style={{backgroundColor: "black"}}>
      <Navbar className="filter_navbar">
        {console.count("1")}
        <Form inline>
          <FormControl
            type="text"
            onChange={(event) => filter_by_name(event.target.value, [...searchResults])}
            placeholder="Filter by company name"
            className=" mr-sm-2" />
        </Form>
        <DropdownButton className="custom_dropdown_button" id="dropdown-basic-button" title= {title}>
          <Dropdown.Item value='price_desc' onClick={sort_by_price_asc}>prize low-to-high</Dropdown.Item>
          <Dropdown.Item value='price_asc' onClick={sort_by_price_desc}>prize high-to-low</Dropdown.Item>
          <Dropdown.Item value='distance' onClick={sort_by_time_asc}>Earlier first</Dropdown.Item>
          <Dropdown.Item value='distance' onClick={sort_by_time_desc}>Later first</Dropdown.Item>
        </DropdownButton>
      </Navbar>
      <SearchResults searchResults={state} validUntil={validUntil} />
    </Container>
  );
} 

export default React.memo(Filters);