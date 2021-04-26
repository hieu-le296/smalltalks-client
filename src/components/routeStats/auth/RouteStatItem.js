import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const RouteStatItem = ({route}) => {

    return (
        <tr>
        <td>{route.method}</td>
        <td>{route.endpoint}</td>
        <td>{route.requestCount}</td>
      </tr>  
    );
}



RouteStatItem.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  export default RouteStatItem;