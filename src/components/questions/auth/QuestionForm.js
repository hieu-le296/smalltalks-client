import React, { useState, useEffect, useContext } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

import {
  useQuestions,
  addQuestion,
  updateQuestion,
  clearCurrent,
  clearQuestionError,
} from '../../../context/question/QuestionState';
import AlertContext from '../../../context/alert/alertContext';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const QuestionForm = () => {
  const [questionState, questionDispatch] = useQuestions();
  const { current, error } = questionState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (current !== null) {
      setTitle(current.title);

      let contentState;

      if (!current.content.startsWith('<p>')) {
        contentState = ContentState.createFromText(current.content);
        setEditorState(() => EditorState.createWithContent(contentState));
        setContent(current.content);
      } else {
        const contentBlock = htmlToDraft(current.content);
        if (contentBlock) {
          contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setEditorState(() => EditorState.createWithContent(contentState));
          setContent(current.content);
        }
      }
    } else {
      setTitle('');
      setEditorState(() => EditorState.createEmpty());
      setContent('');
    }
    if (error) {
      setAlert(error, 'danger');
      clearQuestionError(questionDispatch);
    }
  }, [error, questionDispatch, setAlert, current]);

  const onChangeTitle = (e) => setTitle(e.target.value);

  const onEditorStateChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setContent(currentContentAsHTML);
    if (!editorState.getCurrentContent().hasText()) {
      setContent('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || content === '') {
      setAlert('Please fill all the fields', 'warning');
    } else {
      let question = { title, content };
      let msg;
      if (current === null) {
        msg = await addQuestion(questionDispatch, question);
        if (msg) {
          setAlert(msg, 'success');
        }
      } else {
        const questionId = current.questionId;
        question = { questionId, title, content };
        msg = await updateQuestion(questionDispatch, question);

        if (msg) {
          setAlert(msg, 'success');
        }
      }

      if (error !== null) {
        setAlert(error, 'danger');
        clearQuestionError(questionDispatch);
      }
      clearAll();
    }
  };

  const clearAll = () => {
    clearCurrent(questionDispatch);
  };

  const auto_height = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <form id='question-form' className='form-outLine mt-5' onSubmit={onSubmit}>
      <h2 className='text-center'>
        {current ? 'Edit question' : 'Ask a question'}
      </h2>
      <div>
        <label className='form-label' htmlFor='title'>
          Title
        </label>
        <textarea
          className='form-control'
          id='title'
          onInput={auto_height}
          value={title}
          onChange={onChangeTitle}
        ></textarea>
      </div>

      <div className='mt-5'>
        <label className='form-label' htmlFor='content'>
          Content
        </label>
        <div>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorClassName='editor-class form-control'
            toolbarClassName='form-control'
            toolbar={{
              image: { defaultSize: { height: '512px', width: '1024px' } },
            }}
          />
        </div>
      </div>
      <div className='mt-5 text-center'>
        {current ? (
          <div>
            <button
              type='submit'
              className='btn btn-success btn-rounded btn-lg mx-5'
            >
              <i className='fas fa-save'></i> Save
            </button>
            <button
              className='btn btn-light btn-rounded btn-lg mt-3'
              onClick={clearAll}
            >
              <i className='fas fa-times'></i> Cancel
            </button>
          </div>
        ) : (
          <button type='submit' className='btn btn-primary btn-rounded btn-lg'>
            <i className='fas fa-plus'></i> Post question
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionForm;
