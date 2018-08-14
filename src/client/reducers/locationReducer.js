import { GET_LOCATION } from '../actions';

export default function(state = null, action){
    switch (action.type){
        case GET_LOCATION:
        console.log('reducer' + action.payload);
            return action.payload || false;
        default:
            return state;
    }
}