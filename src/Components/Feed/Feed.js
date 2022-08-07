import React, { useState } from 'react';

import FeedModal from './FeedModal';
import FeedPosts from './FeedPosts';

const Feed = ({ user }) => {
  const [modalPost, setModalPost] = useState(null);

  
  return (
    <div>
      {modalPost && <FeedModal post={modalPost} setModalPost={setModalPost} />}
      <FeedPosts user={user} setModalPost={setModalPost} />
    </div>
  );
};

export default Feed;
