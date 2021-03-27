import { createStore, applyMiddleware  } from 'redux';
import rootReducers from './rootReducers';
import thunk  from 'redux-thunk';
import logger from 'redux-logger'
import { REDUX_PERSISTENT_STATE } from './utils/constants';

// Serialize state and save to browser local Storge.
const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(REDUX_PERSISTENT_STATE, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// Load Serialized data from localStorage, and return the parsed data.
const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem(REDUX_PERSISTENT_STATE);
    if (serialisedState === null) return undefined;
    return {fav: JSON.parse(serialisedState)};
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = createStore(
  rootReducers,
  loadFromLocalStorage(), // load data from local storege and add as initial value to the store.
  applyMiddleware(thunk, logger)
);

// Subscribe to store changes, and save data into localstorge.
store.subscribe(() => saveToLocalStorage(store.getState().fav ?? {}));

export default store;
