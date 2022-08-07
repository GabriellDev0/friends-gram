import React, { useContext } from 'react';
import styles from './PostContent.module.css';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import UserContext from '../../UserContext';
import PostDelete from './PostDelete';
import Image from '../Helper/Image';
const PostContent = ({ data }) => {
  const { currentUser } = useContext(UserContext);
  const { imgURL, comments, title, id, nameUser, views, description, idUser } =
    data[0];
  console.log(currentUser);
  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <Image src={imgURL} alt={title} width="576px" height="576px"/>
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {currentUser && currentUser.uid === idUser ? (
              <PostDelete id={id} />
            ) : (
              <Link to={`/perfil/${nameUser}-${id}`}>@{nameUser}</Link>
            )}
            <span className={styles.views}>{views}</span>
          </p>
          <h1 className={styles.titlePost}>
            <Link to={`/foto/${title}-${id}`}>{title}</Link>
          </h1>
        </div>
        <h3 className={styles.description}>{description}</h3>
      </div>
      <PostComments id={id} comments={comments} />
    </div>
  );
};

export default PostContent;
