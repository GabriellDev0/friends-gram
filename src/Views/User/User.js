import React, { useContext } from 'react'
import UserHeader from './Components/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Feed from '../../Components/Feed/Feed'
import UserPhotoPost from './Components/UserPhotoPost'
import UserStats from './UserStats'
import UserContext from '../../UserContext'
const User = () => {
  const { currentUser } = useContext(UserContext)
  return (
    <section className='container'>
        <UserHeader/>
        <Routes>
            <Route path='/' element={<Feed user={currentUser.uid}/>}/>
            <Route path="postar" element={<UserPhotoPost/>}/>
            <Route path="estatisticas" element={<UserStats/>}/>
        </Routes>
    </section>
  )
}

export default User