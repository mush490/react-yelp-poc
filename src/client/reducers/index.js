import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import locationReducer from './locationReducer';
import restaurantReducer from './restaurantReducer';


export default combineReducers({
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer,
    location: locationReducer,
    restaurant: restaurantReducer
});