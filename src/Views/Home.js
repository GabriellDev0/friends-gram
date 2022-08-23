import React from 'react'
import Feed from '../Components/Feed/Feed'
import Head from '../Components/Helper/Head'
const Home = () => {
  return (
    <section className='container mainContainer'>
      <Head title="Posts" description="Home do site FriendsGram, com o feed de Posts."/>
      <Feed/>
    </section>
  )
}

export default Home