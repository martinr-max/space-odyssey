import React from 'react';
import { Navbar, Form, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import SearchResults from '../searchResults/SearchResults.component';
import { useState } from 'react';
import  propTypes  from 'prop-types';
import "./Filter.styles.scss";
import { useDispatch } from 'react-redux';



function Filters() {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("Filters");
 
  function  sort_by_price_asc() {
    dispatch({ type: 'SORT_BY_PRICE_ASC'  });
    setTitle("prize low-to-high");
  }

  function sort_by_price_desc() {
    dispatch({ type: 'SORT_BY_PRICE_DESC' });
    setTitle("prize high-to-low");
  }

  function sort_by_time_desc() {
    dispatch({ type: 'SORT_BY_TIME_DESC' });
    setTitle("Later first");
  }
  
  function sort_by_time_asc() {
    dispatch({ type: 'SORT_BY_TIME_ASC' });
    setTitle("Earlier first");
  }

  const filter_by_name = (value) => {
      dispatch({type: "FILTER_BY_NAME", value })
  }

return(
    <Container style={{backgroundColor: "black"}}>
      <Navbar className="filter_navbar">
        <Form inline>
          <FormControl
            type="text"
            onChange={(event) => filter_by_name( event.target.value)}
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
      <SearchResults   />
    </Container>
  );
} 

export default Filters;

Filters.propTypes = {
  searchResults: propTypes.array,
  validUntil: propTypes.string
}