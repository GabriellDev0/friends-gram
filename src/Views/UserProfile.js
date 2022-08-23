import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Components/Feed/Feed';
import Head from '../Components/Helper/Head';
const UserProfile = () => {
  const { nameUser, userUid } = useParams();
  return (
    <section className='container mainSection'>
      <h1 className='title'>{nameUser}</h1>
      <Head title={nameUser}/>
      <Feed userUid={userUid} />
    </section>
  );
};

export default UserProfile;
