import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import App from '../App';

jest.mock('../components/Pick');
jest.mock('../components/Fav');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({children}) => <div>{children}</div>,
}));


describe('App tests', () => {

  it('should render Home Page correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Favorites Page correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
