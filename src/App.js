import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Views/Home';
import Login from './Views/Login/Login';
import User from './Views/User/User';
import Post from './Components/Post/Post'
import UserProfile from './Views/UserProfile';
import NotFound from './NotFound';
import { UserStorage } from './UserContext';
import ProtecedRoute from './Components/Helper/ProtecedRoute';
function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtecedRoute>
                  <User />
                </ProtecedRoute>
              }
            />
            <Route path="post/:id" element={<Post/>} />
            <Route path="perfil/:nameUser/:userUid" element={<UserProfile/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
