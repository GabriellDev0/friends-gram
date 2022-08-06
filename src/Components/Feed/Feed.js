import React, { useState } from 'react';
import FeedModal from './FeedModal';
import FeedPosts from './FeedPosts';
const Feed = () => {
  const [modalPost, setModalPost] = useState(null);

  return (
    <div>
      {modalPost && <FeedModal post={modalPost} setModalPost={setModalPost} />}
      <FeedPosts setModalPost={setModalPost} />
    </div>
  );
};

export default Feed;
