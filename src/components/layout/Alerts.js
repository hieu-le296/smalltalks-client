import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={`alert alert-${alert.type} mt-5 text-center`}
        style={alertStyle}
      >
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  );
};

const alertStyle = {
  position: 'fixed',
  top: '35px',
  right: '20px',
  marginLeft: '20px',
  minWidth: '300px',
  zIndex: 4,
};

export default Alerts;
