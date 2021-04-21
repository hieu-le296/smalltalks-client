import React, { useReducer, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //   Set Alert
  const setAlert = useCallback((msg, type, timeout = 3000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => clearAlert(id), timeout);
  }, []);

  const clearAlert = (id) => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
