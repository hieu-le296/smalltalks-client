import React from 'react';

const RouteStatItem = ({ route }) => {
  return (
    <tr>
      <td>{route.method}</td>
      <td>{route.endpoint}</td>
      <td>{route.requestCount}</td>
    </tr>
  );
};

export default RouteStatItem;
