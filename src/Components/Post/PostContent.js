import React from 'react';
import styles from './PostContent.module.css';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
const PostContent = ({ data }) => {

  const { imgURL, comments, title, id, nameUser, views, description } = data[0];
 
  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <img width="576px" height="576px" src={imgURL} alt={title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            <Link to={`/perfil/${nameUser}-${id}`}>@{nameUser}</Link>
            <span className={styles.visualizacoes}>{views}</span>
          </p>
          <h1 className='title'>
            <Link to={`/foto/${title}-${id}`}>{title}</Link>
          </h1>
        </div>
        <h3  className={styles.description}>
         {description}
        </h3>
      </div>
      <PostComments id={id} comments={comments}/>
    </div>
  );
};

export default PostContent;
