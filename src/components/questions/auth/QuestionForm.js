import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {
  useQuestions,
  addQuestion,
  updateQuestion,
  clearCurrent,
  clearQuestionError,
} from '../../../context/question/QuestionState';
import AlertContext from '../../../context/alert/alertContext';

import PreviewModal from './PreviewModal';

const QuestionForm = () => {
  const [questionState, questionDispatch] = useQuestions();
  const { current, error } = questionState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [title, setTitle] = useState('');
  const onChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState('');

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);

  const emptyFields = useCallback(() => {
    setTitle('');
    setEditorState(() => EditorState.createEmpty());
    setContent('');
  }, []);

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearQuestionError(questionDispatch);
    }
  }, [error, questionDispatch, setAlert]);

  useEffect(() => {
    if (title !== '' && content !== '') {
      setIsPreviewDisabled(false);
    } else {
      setIsPreviewDisabled(true);
    }
  }, [title, content]);

  useEffect(() => {
    if (current !== null) {
      setTitle(current.title);

      let contentState;

      if (!current.content.startsWith('<p>')) {
        contentState = ContentState.createFromText(current.content);
        setEditorState(() => EditorState.createWithContent(contentState));
        setContent(current.content);
        setIsPreviewDisabled(false);
      } else {
        const contentBlock = htmlToDraft(current.content);
        if (contentBlock) {
          contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setEditorState(() => EditorState.createWithContent(contentState));
          setContent(current.content);
          setIsPreviewDisabled(false);
        }
      }
    } else {
      emptyFields();
    }
  }, [questionDispatch, current, emptyFields]);

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

  const onPreview = (e) => {
    e.preventDefault();
    setIsOpen(true);
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
      } else {
        const questionId = current.questionId;
        question = { questionId, title, content };
        msg = await updateQuestion(questionDispatch, question);
      }
      if (msg) {
        setAlert(msg, 'success');
      }
      clearAll(e);
      emptyFields();
    }
  };

  const clearAll = (e) => {
    e.preventDefault();
    clearCurrent(questionDispatch);
    setIsPreviewDisabled(true);
  };

  const onClearAllBtn = (e) => {
    e.preventDefault();
    emptyFields();
  };

  const auto_height = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Button states
  const AddState = (
    <Fragment>
      <button
        type='submit'
        className='btn btn-primary btn-rounded mx-lg-5 mx-md-5 mx-sm-auto btn-lg'
      >
        <i className='fas fa-plus' /> Post question
      </button>

      <button
        className='btn btn-secondary btn-rounded btn-lg mt-3'
        disabled={isPreviewDisabled}
        onClick={onPreview}
      >
        <i className='fas fa-file-contract' /> Preview Post
      </button>
    </Fragment>
  );

  const EditState = (
    <Fragment>
      <button
        type='submit'
        className='btn btn-success btn-rounded btn-lg mx-lg-5 mx-md-5 mx-sm-auto'
      >
        <i className='fas fa-save'></i> Update
      </button>

      <button
        className='btn btn-secondary btn-rounded btn-lg mt-3'
        disabled={isPreviewDisabled}
        onClick={onPreview}
      >
        <i className='fas fa-file-contract' /> Preview Post
      </button>

      <button
        className='btn btn-light btn-rounded  mx-lg-5  mx-md-5 btn-lg mt-3'
        onClick={clearAll}
      >
        <i className='fas fa-times'></i> Cancel
      </button>
    </Fragment>
  );

  return (
    <Fragment>
      <form
        id='question-form'
        className='form-outLine mt-5'
        onSubmit={onSubmit}
      >
        <h2 className='text-center'>
          {current ? 'Edit question' : 'Ask a question'}
        </h2>
        <div>
          <button
            className='btn-outline-danger btn-rounded btn-sm float-end mb-3'
            onClick={onClearAllBtn}
          >
            Clear All
          </button>
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
        <div className='mt-5 text-center'>{current ? EditState : AddState}</div>
      </form>
      <PreviewModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        content={content}
        currentQuestion={current}
      />
    </Fragment>
  );
};

export default QuestionForm;
