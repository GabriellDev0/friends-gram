import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Config';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css'
const FeedPhotos = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const collectionRef = collection(db, 'posts');
    const q = query(
      collectionRef,
      orderBy('serverTimestamp', 'desc'),
      limit(6),
    );
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await getDocs(q);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        setError('Ocorreu algum erro ao carregar os posts desta página.');
      }
    };
    getPosts();
    setLoading(false);
  }, []);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (posts) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {posts.map((post) => (
          <FeedPhotosItem key={post.id} post={post} />
        ))}
      </ul>
    );
  } else return null;
};

export default FeedPhotos;
