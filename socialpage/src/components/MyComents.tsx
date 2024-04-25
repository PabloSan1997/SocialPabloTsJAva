import { useAppSelector } from '../hooks';
import '../styles/coment.scss';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { UserInfo } from './UserInfo';
import { ListOptions } from './ListOptions';
import React from 'react';

export function MyComents({ coment, user, createAt, id }: Coment) {
  const state = useAppSelector(state => state.socialReducer);
  const mostrar = state.dataInfo?.username === user.username || state.oneImage?.user.username == state.dataInfo?.username;
  const [show, setShow] = React.useState(false);
  return (
    <div className="coments">
      <UserInfo
        username={user.username}
        nickname={user.nickname}
        urlPerfil={user.userInfo.perfilImage}
        id_user={user.id}
        createAt={createAt} />
      {mostrar ? (
        <>
          {show && <ListOptions id={id} option={'coment'}/>}
          <Bars3Icon className='icono' onClick={()=>setShow(!show)}/>
        </>
      ) : null}

      <p className='data'>{coment}</p>
    </div>
  );
}
