import React from 'react';

const QuestionItem = ({ question }) => {
  const { questionId, title, content, createdAt, updatedAt } = question;
  return (
    <div className='card' style={cardStyle}>
      <div className='card-body'>
        <h5 className='card-title' style={{ color: '#4c51a4' }}>
          {title}
        </h5>
        <p className='card-text'>{content}</p>
        <button type='button' className='btn btn-primary btn-sm me-3'>
          Edit <i class='fas fa-pencil-alt'></i>
        </button>
        <button type='button' className='btn btn-danger btn-sm me-3'>
          Delete <i class='fas fa-trash'></i>
        </button>
      </div>
      <div className='card-footer text-muted'>
        <p>Created: {createdAt}</p>
        <p>Modified: {updatedAt}</p>
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#ddc9e6',
  margin: '15px 0 15px 0px',
};

export default QuestionItem;
