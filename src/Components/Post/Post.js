import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PostContent from './PostContent';
const Post = () => {
  const { id } = useParams();
  const { getModalPost, data, loading, error } = useFirebase();

  useEffect(() => {
    async function getPostItem() {
      await getModalPost(id);
    }
    getPostItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <section className="container mainContainer">
        <PostContent data={data} single={true} />
      </section>
    );
  } else {
    return null;
  }
};

export default Post;
