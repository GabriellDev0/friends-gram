import React, { useEffect } from 'react'
import styles from './FeedModal.module.css'
import useFirebase from '../../Hooks/useFirebase'
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PostContent from '../Post/PostContent';
const FeedModal = ({post}) => {
  const { getModalPost, data, error, loading } = useFirebase();

  useEffect(() => {
    async function getPosts() {
      await getModalPost(post.id);
    }
    getPosts();
//  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <div className={styles.modal}>
      {error && <Error error={error}/>}
      {loading && <Loading/>}
      {data && <PostContent data={data}/> } 
    </div>
  )
}

export default FeedModal