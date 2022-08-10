import React, { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../../UserContext';
import PostCommentsForm from './PostCommentsForm';
import styles from './PostComments.module.css';
const PostComments = (props) => {
  const [comments, setComments] = useState(() => props.comments);
  const commentsSection = useRef(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${
          props.single ? styles.singlePost : ''
        }`}
      >
        {comments.map((comment, index) => (
          <li key={index}>
            <b>{comment.user}: </b>
            <span>{comment.comment}</span>
          </li>
        ))}
      </ul>
      {currentUser && (
        <PostCommentsForm
          id={props.id}
          user={currentUser.displayName}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PostComments;
