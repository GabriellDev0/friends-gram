import React, { useState } from 'react';

import FeedModal from './FeedModal';
import FeedPosts from './FeedPosts';

const Feed = ({ userUid }) => {
  const [modalPost, setModalPost] = useState(null);
  
  return (
    <div>
      {modalPost && <FeedModal post={modalPost} setModalPost={setModalPost} />}
      <FeedPosts userUid={userUid} setModalPost={setModalPost} />
    </div>
  );
};

export default Feed;
