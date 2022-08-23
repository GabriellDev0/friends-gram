import React from 'react';
import { useEffect, useContext } from 'react';
import Head from '../../Components/Helper/Head';
import Loading from '../../Components/Helper/Loading';
import useFirebase from '../../Hooks/useFirebase';
import UserContext from '../../UserContext';
const UserStatsGraphs = React.lazy(() => import('./Components/UserStatsGraphs'));
const UserStats = () => {
  const { currentUser } = useContext(UserContext)
  const { data, loading, getPostsFirebase } = useFirebase()

  useEffect(()=>{
        (async()=>{
            await getPostsFirebase(currentUser.uid, 999)
            console.log(data)
        })()
  }, [])
  if(loading) return <Loading/>
  if(data)
  return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatísticas" description="Relatório sobre suas postagens."/>
      <UserStatsGraphs data={data}/>
    </React.Suspense>
  )
  else return null
};

export default UserStats;
