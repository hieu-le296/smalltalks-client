import React from 'react';
import { css } from '@emotion/react';
import HashLoader from 'react-spinners/HashLoader';

const override = css`
  display: block;
  margin: auto;
  margin-top: 5rem;
  border-color: red;
`;

const Spinner = () => {
  return <HashLoader size={75} color='#9013FE' css={override} />;
};

export default Spinner;
