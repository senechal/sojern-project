import React from 'react';
import { Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { render } from '@testing-library/react';
import reducer from '../rootReducers';

// custom render for when the component needs to connect to a redux Provider.
// You can pass a inicialState or any other store as options.
export const renderWithRedux = (component, {
  initialState,
  store = createStore(reducer, initialState, applyMiddleware(thunk)),
} = {}, options) => ({
  ...render(<Provider store={store}>{component}</Provider>, options),
  ...store,
});