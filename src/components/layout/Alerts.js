import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type} mt-5`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
