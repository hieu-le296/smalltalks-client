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
  usePosts,
  addPost,
  updatePost,
  clearCurrent,
  clearPostError,
} from '../../../context/post/PostState';
import AlertContext from '../../../context/alert/alertContext';

import PreviewModal from './PreviewModal';

const PostForm = () => {
  const [postState, postDispatch] = usePosts();
  const { current, error } = postState;

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
      clearPostError(postDispatch);
    }
  }, [error, postDispatch, setAlert]);

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

      const blocksFromHtml = htmlToDraft(current.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(() => EditorState.createWithContent(contentState));
      setContent(current.content);
      setIsPreviewDisabled(false);
    } else {
      emptyFields();
    }
  }, [postDispatch, current, emptyFields]);

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
      let post = { title, content };
      let msg;
      if (current === null) {
        msg = await addPost(postDispatch, post);
      } else {
        const postId = current.postId;
        post = { postId, title, content };
        msg = await updatePost(postDispatch, post);
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
    clearCurrent(postDispatch);
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
        <i className='fas fa-plus' /> Create Post
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
      <form id='post-form' className='form-outLine mt-5' onSubmit={onSubmit}>
        <h2 className='text-center'>
          {current ? (
            <div>
              <i className='fas fa-edit fa-lg' /> Edit Post
            </div>
          ) : (
            <div>
              <i className='fas fa-blog fa-lg' /> New Post
            </div>
          )}
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
        currentPost={current}
      />
    </Fragment>
  );
};

export default PostForm;
