import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import RouteStatsContext from './routeStatsContext';
import routeStatsReducer from './routeStatsReducer';

import { GET_ROUTE_STATS } from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context
export const useRouteStats = () => {
  const { state, dispatch } = useContext(RouteStatsContext);
  return [state, dispatch];
};

// Get All Questions
export const getRouteStats = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/routeStats`);
    dispatch({ type: GET_ROUTE_STATS, payload: res.data.data });
  } catch (err) {
    //dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    console.log(err);
  }
};

const RouteStatsState = (props) => {
  const initState = {
    statistics: [],
  };

  const [state, dispatch] = useReducer(routeStatsReducer, initState);

  return (
    <RouteStatsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RouteStatsContext.Provider>
  );
};

export default RouteStatsState;
