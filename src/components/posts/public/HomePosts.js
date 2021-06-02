import React, { Fragment } from 'react';
import usePagination from '../../../hooks/usePagination';
import PostItem from './PostItem';

const HomePosts = ({ posts, filtered, postHomeStyles }) => {
  // Using custom hooks
  const {
    slicedData,
    pagination,
    pages,
    currentPage,
    prevPage,
    nextPage,
    changePage,
  } = usePagination({ itemsPerPage: 5, data: posts });

  const showFilteredPosts =
    filtered &&
    filtered.map((filter) => (
      <PostItem key={filter.postId} id={filter.postId} post={filter} />
    ));

  const showSlicedPosts =
    slicedData.length > 0 &&
    slicedData.map((post) => (
      <PostItem key={post.postId} id={post.postId} post={post} />
    ));

  const showPagination = (
    <>
      <nav className='mt-3' aria-label='...'>
        <ul className='pagination justify-content-center pagination-lg'>
          {currentPage === 1 ? null : (
            <li className='page-item'>
              <a
                className='page-link '
                href='#!'
                tabIndex='-1'
                aria-disabled='true'
                onClick={prevPage}
              >
                Previous
              </a>
            </li>
          )}

          {pagination.map((page) => {
            if (!page.ellipsis) {
              return (
                <li
                  key={page.id}
                  className={page.current ? 'page-item active' : 'page-item'}
                >
                  <a
                    href='/#'
                    className='page-link'
                    onClick={(e) => changePage(page.id, e)}
                  >
                    {page.id}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={page.id} className=' pagination-ellipsis'>
                  &hellip;
                </li>
              );
            }
          })}

          {currentPage === pages ? null : (
            <li className='page-item'>
              <a
                className='page-link'
                href='#!'
                tabIndex='-1'
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );

  if (posts.length === 0 || posts === null)
    return <h4 classNameName='text-center mt-5'>Wanna share something?</h4>;

  return (
    <Fragment>
      <div style={postHomeStyles}>
        {filtered !== null ? showFilteredPosts : showSlicedPosts}
      </div>

      {showPagination}
    </Fragment>
  );
};

export default HomePosts;
