import React, { useEffect } from 'react';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPostsItem from './FeedPostsItem';
import styles from './FeedPosts.module.css';
import useFirebase from '../../Hooks/useFirebase';
import Button from '../Forms/Button';
const FeedPosts = ({ setModalPost, user }) => {
  const { getPostsFirebase, infiniteScroll, data, error, loading, lastVisible } =
    useFirebase();

  useEffect(() => {
    async function getPosts() {
      await getPostsFirebase(user);
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <>
        <ul className={`${styles.feed} animeLeft`}>
          {data.map((post) => (
            <FeedPostsItem
              key={post.id}
              post={post}
              setModalPost={setModalPost}
            />
          ))}
        </ul>
        <div class={styles.morePosts}>
        {lastVisible ? (
          <Button onClick={infiniteScroll}>Carregar mais..</Button>
        ) : (
            <h3>Não há mais posts para serem carregados.</h3>
        )}
        </div>     
      </>
    );
  } else return null;
};

export default FeedPosts;
