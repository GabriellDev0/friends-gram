import React, { useContext } from 'react';
import styles from './PostContent.module.css';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import UserContext from '../../UserContext';
import PostDelete from './PostDelete';
import Image from '../Helper/Image';
const PostContent = ({ data, single }) => {
  const { currentUser } = useContext(UserContext);
  const { imgURL, comments, title, id, nameUser, views, description, idUser } =
    data[0];
  return (
    <div className={`${styles.post} ${ single ? styles.singlePost : ''}`}>
      <div className={styles.img}>
        <Image src={imgURL} alt={title} width="576px" height="576px"/>
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {currentUser && currentUser.uid === idUser ? (
              <PostDelete id={id} />
            ) : (
              <Link to={`/perfil/${nameUser}/${idUser}`}>@{nameUser}</Link>
            )}
            <span className={styles.views}>{views}</span>
          </p>
          <h1 className={styles.titlePost}>
            <Link to={`/post/${id}`}>{title}</Link>
          </h1>
        </div>
        <h3 className={styles.description}>{description}</h3>
      </div>
      <PostComments id={id} single={single} comments={comments} />
    </div>
  );
};

export default PostContent;
