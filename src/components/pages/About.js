import React, { Fragment } from 'react';

const About = () => {
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
        <div className='col-xl-6 col-md-6 mb-4'>
          <div className='card border-0 shadow'>
            <img
              src='https://hieulocker.tk/images/hieu.jpg'
              className='card-img-top rounded-circle mx-auto mt-3'
              alt='...'
              style={{ maxHeight: '50%', maxWidth: '50%' }}
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

        <div className='col-xl-6 col-md-6 mb-4'>
          <div className='card border-0 shadow'>
            <img
              src='https://gurjitlocker.tk/images/profile.jpg'
              className='card-img-top rounded-circle mx-auto mt-3'
              alt='...'
              style={{ maxHeight: '50%', maxWidth: '50%' }}
            />
            <div className='card-body text-center'>
              <h5 className='card-title mb-0'>Team member</h5>
              <div className='card-text text-black-50'>
                I am Gurjit! A 3rd year Computer Information Systems student at
                UFV, majoring in Software Development and an aspiring Software
                Developer! I love exploring new places, reading tech blogs, and
                talking to new people {':)'} My expertise is in {'=>'} Java,
                JavaScript, Node, React, SQL, and Python!
              </div>
            </div>
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
