import React, { useContext } from 'react'
import UserHeader from './Components/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Feed from '../../Components/Feed/Feed'
import UserPhotoPost from './Components/UserPhotoPost'
import UserStats from './UserStats'
import UserContext from '../../UserContext'
import NotFound from '../../NotFound'
import Head from '../../Components/Helper/Head'
const User = () => {
  const { currentUser } = useContext(UserContext)
  return (
    <section className='container'>
      <Head title="Minha Conta" description="Todas as suas postagens."/>
        <UserHeader/>
        <Routes>
            <Route path='/' element={<Feed userUid={currentUser.uid}/>}/>
            <Route path="postar" element={<UserPhotoPost/>}/>
            <Route path="estatisticas" element={<UserStats/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </section>
  )
}

export default User