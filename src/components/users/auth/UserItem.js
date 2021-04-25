import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
    useUsers
  } from '../../../context/users/UserState';

import AlertContext from '../../../context/alert/alertContext';

const API_URL = 'http://datacomputation.com/uploads';


const UserItem = ({user}) => {

    //Get user dispatch at index 1
    //const userDispatch = useUsers()[1];

    const {userId, username, email,role, profilePic, createdAt, updatedAt} = user;


  //  const alertContext = useContext(AlertContext);
    //const { setAlert } = alertContext;




  return (
    <div className='card col-6'>
    <div className='card-body'>
      <h5 className='card-title fw-bold'>Username: {username}</h5>
      <p className='text-muted fs-6'>
        <strong>Created: </strong>
        {new Date(`${createdAt}`).toLocaleString()}
      </p>

      <p className='card-text text-truncate'>{email}</p>

      <div className='float-end'>
          <button
            type='button'
            className='btn btn-secondary btn-sm me-3'
            onClick={() => console.log('ok...')}
          >
            <i className='fas fa-pencil-alt'></i> Edit
          </button>
          <button
            type='button'
            className='btn btn-danger btn-sm me-3'
            onClick={() => console.log(' I see ')}
          >
            <i className='fas fa-trash'></i> Delete
          </button>
        </div>

    </div>
    {/* <div>
        <img src={`${API_URL}/${profilePic}`} />
    </div> */}
    <div className='card-footer text-muted fs-6'>
      <p>
        <strong>Modified</strong>: {new Date(`${updatedAt}`).toLocaleString()}
      </p>
    </div>
   
  </div>
    
  );

}


UserItem.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  export default UserItem;