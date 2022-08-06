import React from 'react';
import styles from './PostContent.module.css';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
const PostContent = ({ data }) => {

  const { imgURL, comments, title, id, nameUser, views } = data[0];
  setTimeout(()=>{
    console.log(data)
  }, 3000)
  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <img src={imgURL} alt={title} />
      </div>
      <div className={styles.details}>
        <div>
          <p>
            <Link to={`/perfil/${nameUser}-${id}`}>@{nameUser}</Link>
            <span className={styles.visualizacoes}>{views}</span>
          </p>
          <h1 className='title'>
            <Link to={`/foto/${title}-${id}`}>{title}</Link>
          </h1>
        </div>
      </div>
      <PostComments id={`${title}-${id}`} comments={comments}/>
    </div>
  );
};

export default PostContent;
