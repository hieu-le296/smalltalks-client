import React from 'react';
import PropTypes from 'prop-types';

const API_URL = 'http://datacomputation.com/uploads';

const UserItem = ({ user }) => {
  const {
    userId,
    name,
    username,
    email,
    role,
    profilePic,
    createdAt,
    updatedAt,
  } = user;

  return (
    <div className='card'>
      <div className='card-body '>
        <img
          src={user && `${API_URL}/avatars/${profilePic}`}
          className='rounded-circle shadow-2-strong profile-pic'
          height='75'
          width='75'
          alt='profile'
          loading='lazy'
          onError={(e) => (e.style.visibility = 'hidden')}
        />
        <h3 className='card-title fw-bold'>{name}</h3>
        <p className='lead'>
          <strong>Username</strong>: {username}
        </p>
        <p className='lead'>
          <strong>Email:</strong> {email}
        </p>
        <p className='lead'>
          <strong>Role:</strong> {role}
        </p>
      </div>

      <div className='card-footer text-muted fs-6'>
        <p>
          <strong>Created: </strong>
          {new Date(`${createdAt}`).toLocaleString()}
        </p>
        <p>
          <strong>Modified</strong>: {new Date(`${updatedAt}`).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
