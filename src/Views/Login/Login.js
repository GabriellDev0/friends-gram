import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import LoginCreate from './Components/LoginCreate'
import LoginPasswordLost from './Components/LoginPasswordLost'
import LoginPasswordReset from './Components/LoginPasswordReset'
import UserContext from '../../UserContext'

const Login = () => {
  const { currentUser } = React.useContext(UserContext)

  if(currentUser) return <Navigate to="/conta"/>
  return (
    <div>
      <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="criar" element={<LoginCreate/>}/>
          <Route path="perdeu" element={<LoginPasswordLost/>}/>
          <Route path="resetar" element={<LoginPasswordReset/>}/>
      </Routes>
    </div>
  )
}

export default Login