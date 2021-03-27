import { combineReducers } from 'redux'
import pick from './reducers/pick.reducer';
import fav from './reducers/fav.reducer'

export default combineReducers({
    pick,
    fav,
});