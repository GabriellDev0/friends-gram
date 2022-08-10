import React, { useState } from 'react';
import FeedModal from './FeedModal';
import FeedPosts from './FeedPosts';
import PropTypes from 'prop-types'
const Feed = ({ userUid }) => {
  const [modalPost, setModalPost] = useState(null);
  
  return (
    <div>
      {modalPost && <FeedModal post={modalPost} setModalPost={setModalPost} />}
      <FeedPosts userUid={userUid} setModalPost={setModalPost} />
    </div>
  );
};

Feed.propTypes ={
  userUid: PropTypes.string
}

export default Feed;
