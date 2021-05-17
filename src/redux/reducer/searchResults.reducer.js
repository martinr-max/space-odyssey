import { filterByName, sortByTimeDesc, sortByTimeAsc, sortByPriceAsc, sortByPriceDesc } from "./filters.utils";
import {searchActions} from '../actions/search.actions';

const initialState = {
    searchResults: [],
    validUntil: "",
    addedBookings: [],
    savedBookings: [],
    filtered: []
}

const searchResultsReducer = (state = initialState, action) => {
    if (action.type === searchActions.RETURN_SEARCH_RESULTS) {
      return {
        ...state,
        searchResults: action.results,
        filtered: action.results,
        validUntil: action.validUntil
      }
    }
    else if (action.type === searchActions.FILTER_BY_NAME) {
        let filteredResults = filterByName(state.searchResults, action.value);
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: filteredResults
      }
    }
   else if (action.type === searchActions.SORT_BY_TIME_DESC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByTimeDesc(state.searchResults),
      }
    }
    else if (action.type === searchActions.SORT_BY_PRICE_ASC) {
     return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByPriceAsc(state.searchResults),
     }
    }
    else if (action.type === searchActions.SORT_BY_PRICE_DESC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByPriceDesc(state.searchResults),
      }
    }
    else if (action.type === searchActions.SORT_BY_TIME_ASC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByTimeAsc(state.searchResults),
      }
    }
    else if (action.type === searchActions.BOOK_TICKET) {
      return {
        ...state,
        addedBookings: [...state.addedBookings, action.reservations],
        searchResults: state.searchResults,
      }
    }
    else if (action.type === searchActions.REMOVE_BOOKING) {
      const addedBookingsArray = [...state.addedBookings];
      const array = addedBookingsArray.map(arr => arr.filter(m => m.reservationId !== action.reservationId));
      state.addedBookings.splice(array, 1)
      return {
        ...state,
        addedBookings: [...state.addedBookings],
      }
    }
    else if (action.type === searchActions.SAVE_BOOKINGS) {
      return {
        ...state,
        savedBookings: [...state.savedBookings, action.savedReservations]
      }
    }
    return state;
}

export default searchResultsReducer;