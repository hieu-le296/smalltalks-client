import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';

const About = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/contactme`,
        contact,
        config
      );
      setAlert(res.data.msg, 'success');
      setContact({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setAlert(err.response.data.error, 'danger');
    }
  };

  return (
    <Fragment>
      <header className='text-center py-5 mb-4 mt-5' style={backgroundStyle}>
        <div className='container'>
          <p className='text-center'>
            <i className='fas fa-users fa-3x text-white'></i>
          </p>
          <h1 className='font-weight-light text-white'>Meet the Team</h1>
        </div>
      </header>

      <div className='row'>
        <div className='col-xl-6 col-md-4 mb-auto'>
          <div
            className='card mt-3 border-0 shadow'
            style={{ height: '400px', width: '550px' }}
          >
            <img
              src='https://hieulocker.tk/images/hieu.jpg'
              className='card-img-top rounded-circle mx-auto mt-3'
              alt='...'
              style={{ maxHeight: '50%', maxWidth: '35%' }}
            />
            <div className='card-body text-center'>
              <h5 className='card-title mb-0'>Team member</h5>
              <div className='card-text text-black-50'>
                My name is Hieu Le. I am the third year student in Bachelor of
                Computer Information System at the University of the Fraser
                Valley, concerntrating on Software Development. In my spare
                time, I like playing Cities Skylines, GTAV, reading techblogs
                and travelling.
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-6 col-md-8 mb-auto'>
          <div
            className='mt-3 card form-container'
            style={{ height: '400px', width: '550px' }}
          >
            <h4 className='text-center mt-3'>Contact Me</h4>
            <form onSubmit={onSubmit}>
              <div className=' mb-4'>
                <label className='form-label' htmlFor='name'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='form-control'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
              </div>

              <div className='mb-4'>
                <label className='form-label' htmlFor='email'>
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className='mb-4'>
                <label className='form-label' htmlFor='message'>
                  Message
                </label>
                <textarea
                  className='form-control'
                  style={{ overflow: 'auto' }}
                  id='message'
                  rows='2'
                  name='message'
                  value={message}
                  onChange={onChange}
                ></textarea>
              </div>

              <button
                type='submit'
                className='btn btn-primary btn-rounded btn-block mb-4'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const backgroundStyle = {
  background:
    'linear-gradient(to left, rgba(106, 17, 203, 0.55), rgba(37, 117, 252, 0.55))',
  borderRadius: '20px',
};

export default About;
