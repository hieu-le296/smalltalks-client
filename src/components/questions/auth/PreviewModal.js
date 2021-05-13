import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './Modal.css';
import { useAuth } from '../../../context/auth/AuthState';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const PreviewModal = ({ open, currentQuestion, title, content, onClose }) => {
  const authState = useAuth()[0];
  const { user } = authState;

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className='overlay-styles'>
        <div className='modal-styles'>
          <div className='card-body'>
            <h1 className='card-title fw-bold'>{title}</h1>
            <p className='text-muted fs-6'>
              <i className='fas fa-clock'></i> {new Date().toLocaleString()}
            </p>
            {currentQuestion !== null ? (
              <p className='text-muted'>
                Posted by:{' '}
                <img
                  src={`${API_URL}/${currentQuestion.postedBy.profilePic}`}
                  alt='profile'
                  className='rounded-circle'
                  height='35'
                  width='35'
                  loading='lazy'
                />{' '}
                <Link to={`/users/${currentQuestion.postedBy.username}`}>
                  <strong> {currentQuestion.postedBy.name}</strong>
                </Link>
              </p>
            ) : (
              user.data !== null && (
                <p className='text-muted'>
                  Posted by:{' '}
                  <img
                    src={`${API_URL}/${user.data.profilePic}`}
                    alt='profile'
                    className='rounded-circle'
                    height='35'
                    width='35'
                    loading='lazy'
                  />{' '}
                  <Link to={`/users/${user.data.username}`}>
                    <strong> {user.data.name}</strong>
                  </Link>
                </p>
              )
            )}
            <div
              className='card-text article-content'
              dangerouslySetInnerHTML={createMarkup(content)}
            ></div>
          </div>
          <div className='card-footer text-muted fs-6'>
            <p>
              <i className='fas fa-edit'></i> {new Date().toLocaleString()}
            </p>
            <button
              className='btn btn-primary btn-rounded float-end'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default PreviewModal;
