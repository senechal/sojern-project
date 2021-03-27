import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Fav from './components/Fav';
import Pick from './components/Pick';
import { Nav } from './components/styles';

function App() {
  return (
    <>
      <Router>
        <div>
          <header>
            <Nav>
              <Link to="/" >Home</Link> | <Link to="/favorites" >Favorites</Link>
            </Nav>
          </header>
        </div>
        <Switch>
            <Route path="/favorites">
              <Fav />
            </Route>
            <Route path="/">
              <Pick />
            </Route>
          </Switch>
      </Router>
      <NotificationContainer />
    </>
  );
}

export default App;
