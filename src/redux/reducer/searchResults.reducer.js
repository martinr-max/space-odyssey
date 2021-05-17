import { searchActionsTypes } from "../actions/searchActions.type";
import { filterByName, sortByTimeDesc, sortByTimeAsc, sortByPriceAsc, sortByPriceDesc } from "./filters.utils";

const initialState = {
    searchResults: [],
    validUntil: "",
    addedBookings: [],
    savedBookings: [],
    filtered: [],
    total: 0
}

const searchResultsReducer = (state = initialState, action) => {
    if (action.type === searchActionsTypes.RETURN_SEARCH_RESULTS) {
      return {
        ...state,
        searchResults: action.results,
        filtered: action.results,
        validUntil: action.validUntil,
        addedBookings: state.addedBookings
      }
    }
    else if (action.type === searchActionsTypes.FILTER_BY_NAME) {
        let filteredResults = filterByName(state.searchResults, action.value);
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: filteredResults
      }
    }
   else if (action.type === searchActionsTypes.SORT_BY_TIME_DESC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByTimeDesc(state.searchResults),
      }
    }
    else if (action.type === searchActionsTypes.SORT_BY_PRICE_ASC) {
     return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByPriceAsc(state.searchResults),
     }
    }
    else if (action.type === searchActionsTypes.SORT_BY_PRICE_DESC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByPriceDesc(state.searchResults),
      }
    }
    else if (action.type === searchActionsTypes.SORT_BY_TIME_ASC) {
      return {
        ...state,
        searchResults: state.searchResults,
        filtered: sortByTimeAsc(state.searchResults),
      }
    }
    else if (action.type === searchActionsTypes.FIND_TOTAL) {
      return {
        ...state,
        total: action.totalFare,
      }
    }
    else if (action.type === searchActionsTypes.BOOK_TICKET) {
      return {
        ...state,
        addedBookings: [...state.addedBookings, action.reservations],
        searchResults: state.searchResults,
      }
    }
    else if (action.type === searchActionsTypes.REMOVE_BOOKING) {
      const addedBookingsArray = [...state.addedBookings];
      const array = addedBookingsArray.map(arr => arr.filter(m => m.reservationId !== action.reservationId));
      state.addedBookings.splice(array, 1);
      return {
        ...state,
        addedBookings: [...state.addedBookings],
      }
    }
    else if (action.type === searchActionsTypes.SAVE_BOOKINGS) {
      return {
        ...state,
        savedBookings: [...state.savedBookings, action.savedReservations],
      }
    }
    return state;
}



export default searchResultsReducer;