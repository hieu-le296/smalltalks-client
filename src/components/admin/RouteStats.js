import React, { useState, useEffect, Fragment } from 'react';

import {
  getRouteStats,
  useRouteStats,
} from '../../context/routeStats/routeStatsState';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
import RouteStatItem from '../routeStats/auth/RouteStatItem';

const RouteStats = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const [routeStatsState, routeStatsDispatch] = useRouteStats();
  const { statistics } = routeStatsState;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);

    if (user && isAuthenticated && user.data.role == 'admin') {
      getRouteStats(routeStatsDispatch);
    }
    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

  console.log(statistics);

  return (
    <Fragment>
      {spinner ? (
        <Spinner />
      ) : (
        <Fragment>
          {statistics !== null ? (
            <Fragment>
              <div className='table-responsive'>
                <table className='table table-hover table-borderless table-secondary '>
                  <thead>
                    <tr>
                      <th scope='col'>METHOD</th>
                      <th scope='col'>ENDPOINT</th>
                      <th scope='col'>REQUEST COUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statistics.map((stat, i) => (
                      <RouteStatItem route={stat} key={i} id={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Fragment>
          ) : (
            <Spinner />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RouteStats;
