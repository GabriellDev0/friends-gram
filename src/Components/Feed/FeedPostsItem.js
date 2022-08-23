import React from 'react'
import Image from '../Helper/Image'
import styles from './FeedPostsItem.module.css'
import useFirebase from '../../Hooks/useFirebase'
const FeedPostsItem = ({post, setModalPost}) => {
    const { setViewPost } = useFirebase()
    function handleClick(){
     setModalPost(post)
     setViewPost(post.id)
    }
  return (
    <li className={styles.post} onClick={handleClick}>
      <Image src={post.imgURL} alt={post.title}/>
      <span className={styles.views}>{post.views}</span>
    </li>
  )
}

export default FeedPostsItem