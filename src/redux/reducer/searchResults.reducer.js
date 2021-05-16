import { filterByName, sortByTimeDesc, sortByTimeAsc, sortByPriceAsc, sortByPriceDesc } from "./filters.utils";

const initialState = {
    searchResults: [],
    validUntil: "",
    addedBookings: [],
    savedBookings: [],
}
console.log(initialState)
const searchResultsReducer = (state = initialState, action) => {
    if (action.type === "returnSearchResults") {
      return {
        ...state,
        searchResults: action.results,
        filteredResults: state.searchResults,
        validUntil: action.validUntil
      }
    }
    if (action.type === "filter") {
      return {
        ...state,
        searchResults: state.searchResults,
        filteredResults: filterByName(state.searchResults, action.value),
      }
    }
    if (action.type === "sort_by_time_desc") {
      return {
        ...state,
        searchResults: state.searchResults,
        filteredProducts: sortByTimeDesc(state.searchResults),
      }
    }
    if (action.type === 'sort_by_price_asc') {
     return {
        ...state,
        searchResults: state.searchResults,
        filteredResults: sortByPriceAsc(state.searchResults),

     }
    }
    if (action.type === 'sort_by_price_desc') {
      return {
        ...state,
        searchResults: state.searchResults,
        filteredResults: sortByPriceDesc(state.searchResults),
      }
    }
    if (action.type === "sort_by_time_asc") {
    
      return {
        ...state,
        filteredResults: sortByTimeAsc(state.searchResults),
      }
    }
    if (action.type === "bookTicket") {
      return {
        ...state,
        addedBookings: [...state.addedBookings, action.reservations],
        searchResults: state.searchResults,
      }
    }
    if (action.type === "removeBooking") {
      const addedBookingsArray = [...state.addedBookings];
      const array = addedBookingsArray.map(arr => arr.filter(m => m.reservationId !== action.reservationId));
      state.addedBookings.splice(array, 1)
      return {
        ...state,
        addedBookings: [...state.addedBookings],
      }
    }
    if (action.type === "saveBookings") {
      return {
        ...state,
        savedBookings: [...state.savedBookings, action.savedReservations]
      }
    }
    return state
}

export default searchResultsReducer;