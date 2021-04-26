import {
    GET_ROUTE_STATS
} from '../types';

const routeStatsReducer = (state, action) => {
    switch (action.type) {

        case GET_ROUTE_STATS:
            return {
                ...state,
                statistics: action.payload,
              };

        default:
            return state;

    }

}


export default routeStatsReducer;
