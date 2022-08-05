import React from 'react'
import styles from './FeedPhotosItem.module.css'
const FeedPhotoItem = ({post}) => {
  return (
    <li className={styles.post}>
      <img src={post.imgURL} alt={post.title} />
      <span className={styles.views}>{post.views}</span>
    </li>
  )
}

export default FeedPhotoItem