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

    const {userId, name, username, email, role, profilePic, createdAt, updatedAt} = user;


  //  const alertContext = useContext(AlertContext);
    //const { setAlert } = alertContext;




  return (
    <div className='card'>
    <div className='card-body '>
    <img
                src={user && `${API_URL}/avatars/${profilePic}`}
                className='rounded-circle shadow-2-strong profile-pic'
                height='75'
                alt=''
                loading='lazy'
                onError={(e) => (e.style.visibility = 'hidden')}
              />
    <h3 className='card-title fw-bold'>Name: {name}</h3>
      <p className='lead'>Username: {username}</p>
      <p className='lead'>Email: {email}</p>
      <p className='lead'>Role: {role}</p>
      <p className='text-muted fs-6'>
        <strong>Created: </strong>
        {new Date(`${createdAt}`).toLocaleString()}
      </p>

      <p className='card-text text-truncate'>{email}</p>

      

    </div>
 
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