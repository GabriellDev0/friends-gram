import React from 'react'
import Image from '../Helper/Image'
import styles from './FeedPostsItem.module.css'
const FeedPostsItem = ({post, setModalPost}) => {
    function handleClick(){
        setModalPost(post)    
    }
  return (
    <li className={styles.post} onClick={handleClick}>
      <Image src={post.imgURL} alt={post.title}/>
      <span className={styles.views}>{post.views}</span>
    </li>
  )
}

export default FeedPostsItem