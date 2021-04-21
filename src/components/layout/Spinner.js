import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ background: 'none', margin: 'auto', display: 'block' }}
        alt='loading...'
      />
    </Fragment>
  );
};

export default Spinner;
