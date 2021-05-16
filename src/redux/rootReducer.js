import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from  'redux-persist/lib/storage/session'
import searchResultsReducer from './reducer/searchResults.reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
});

export default persistReducer(persistConfig, rootReducer);