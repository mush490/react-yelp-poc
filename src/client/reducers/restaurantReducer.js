import { SEARCH_RESTAURANTS } from '../actions';
import { RANDOM_RESTAURANT } from '../actions';

export default function(state = null, action){
    switch (action.type){
        case SEARCH_RESTAURANTS:
        console.log('reducer' + action.payload);
            return action.payload || false;
        case RANDOM_RESTAURANT:
            console.log('reducer' + action.payload);
                return action.payload || false;
        default:
            return state;
    }
}