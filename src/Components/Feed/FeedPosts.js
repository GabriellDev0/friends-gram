import React, { useEffect } from 'react';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPostsItem from './FeedPostsItem';
import styles from './FeedPosts.module.css';
import useFirebase from '../../Hooks/useFirebase';
const FeedPosts = ({ setModalPost }) => {
  const { getPostsFirebase, data, error, loading } = useFirebase();
  
  useEffect(() => {
    async function getPosts() {
      await getPostsFirebase()
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((post) => (
          <FeedPostsItem
            key={post.id}
            post={post}
            setModalPost={setModalPost}
          />
        ))}
      </ul>
    );
  } else return null;
};

export default FeedPosts;
