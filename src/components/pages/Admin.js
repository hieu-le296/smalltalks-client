import React, { Fragment, useState, useEffect } from 'react';
import PostForm from '../posts/auth/PostForm';
import PostFilter from '../posts/PostFilter';
import PostPage from '../admin/posts/PostPage';
import Users from '../admin/users/Users';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

import { usePosts } from '../../context/post/PostState';

const Admin = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { user } = authState;

  const postState = usePosts()[0];

  const { current } = postState;

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [spinner]);

  const adminPage = (
    <Fragment>
      <h1 className='text-center mt-5'>Admin Panel</h1>
      <div className='row mt-5'>
        <div className='col'>
          <ul className='nav nav-tabs nav-fill mb-3' id='ex1' role='tablist'>
            <li className='nav-item' role='presentation'>
              <a
                className='nav-link active'
                id='ex2-tab-1'
                data-mdb-toggle='tab'
                href='#ex2-tabs-1'
                role='tab'
                aria-controls='ex2-tabs-1'
                aria-selected='true'
              >
                Users
              </a>
            </li>
            <li className='nav-item' role='presentation'>
              <a
                className='nav-link'
                id='ex2-tab-2'
                data-mdb-toggle='tab'
                href='#ex2-tabs-2'
                role='tab'
                aria-controls='ex2-tabs-2'
                aria-selected='false'
              >
                Posts
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='tab-content' id='ex2-content'>
        <div
          className='tab-pane fade show active'
          id='ex2-tabs-1'
          role='tabpanel'
          aria-labelledby='ex2-tab-1'
        >
          <div className='card text-center' style={backgroundStyle}>
            <i className='fas fa-users fa-3x mt-3' />
            <h2 className='mt-3 mb-3'>User Administration</h2>
          </div>
          <Users />
        </div>
        <div
          className='tab-pane fade'
          id='ex2-tabs-2'
          role='tabpanel'
          aria-labelledby='ex2-tab-2'
        >
          <div className='row'>
            <div className='card text-center' style={backgroundStyle}>
              <i className='fas fa-blog fa-3x mt-3' />
              <h2 className='mt-3 mb-3'>Post Administration</h2>
            </div>
            {current !== null ? (
              <Fragment>
                <div className='col-xl-6 col-md-6 mb-4'>
                  <PostForm />
                </div>
              </Fragment>
            ) : (
              <div className='col-xl-6 col-md-6 mb-4'>
                <h3 className='text-center mt-5'>Instructions</h3>
                <div className='card mt-5 form-outLine'>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                      Edit a post by clicking{' '}
                      <button
                        type='button'
                        className='btn btn-secondary btn-rounded btn-sm me-3'
                      >
                        <i className='fas fa-pencil-alt' />
                      </button>{' '}
                    </li>
                    <li className='list-group-item'>
                      Delete a post by clicking{' '}
                      <button
                        type='button'
                        className='btn btn-danger btn-rounded btn-sm me-3'
                      >
                        <i className='fas fa-trash' />
                      </button>
                    </li>

                    <li className='list-group-item'>
                      Reading more a post by clicking{' '}
                      <button
                        type='button'
                        className='btn btn-info btn-rounded btn-sm me-3'
                      >
                        <i className='fas fa-arrow-circle-right' />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className='col-xl-6 col-md-6 mb-4'>
              <h3 className='text-center mt-5'>Posted Posts</h3>
              <PostFilter />
              <PostPage />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const noAdminPage = (
    <Fragment>
      <h1 className='text-center text-danger mt-5'>Access Restricted</h1>
    </Fragment>
  );

  const showPage = user && user.data.role !== 'admin' ? noAdminPage : adminPage;

  return <Fragment>{spinner ? <Spinner /> : showPage}</Fragment>;
};

const backgroundStyle = {
  background:
    'linear-gradient(to left, rgba(106, 17, 203, 0.55), rgba(37, 117, 252, 0.55))',
  borderRadius: '20px',
  color: 'white',
};

export default Admin;
