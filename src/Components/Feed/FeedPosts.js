import React, { useEffect, useRef } from 'react';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPostsItem from './FeedPostsItem';
import styles from './FeedPosts.module.css';
import useFirebase from '../../Hooks/useFirebase';

const FeedPosts = ({ setModalPost, userUid }) => {
  const {
    getPostsFirebase,
    infiniteScroll,
    data,
    error,
    loading,
    lastVisible,
  } = useFirebase();

  useEffect(() => {
    async function getPosts() {
      await getPostsFirebase(userUid);
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let wait = false;
    function loadMore() {
      if (lastVisible) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          infiniteScroll(userUid);
          wait = true;
          document.body.scrollTo({bottom: 300, behavior: 'smooth'})
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      }
    }
    window.addEventListener('wheel', loadMore);
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('wheel', loadMore);
      window.removeEventListener('scroll', loadMore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisible]);

  if (error) return <Error error={error} />;
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
        <div className={styles.morePosts}>
          {loading && <Loading/>}
          {!lastVisible && <h3>Não há mais posts para serem carregados.</h3>}
        </div>
      </>
    );
  } else return null;
};

export default FeedPosts;
