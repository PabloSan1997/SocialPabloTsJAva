

// import React from "react";
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../hooks';
import { convertDate } from '../utilites/converDate';
import '../styles/imageCountComment.scss';
import { ListOptions } from './ListOptions';
import React from 'react';

export function ImagenCountComent({ user, description, urlImage, id, coments, createAt }: ImageComentCount) {
  const navigate = useNavigate();
  const state = useAppSelector(state => state.socialReducer);
  const username = state.dataInfo?.username;
  const goPerfil = () => {
    navigate('/perfil/' + user.username);
  }
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <div className="caja">
      <div className="user_info">
        {user.userInfo ?
          <img src={user.userInfo.perfilImage} alt={user.username} onClick={goPerfil} className='perfil_image' /> : null}
        <div className="user_names">
          <span className='nickname' onClick={goPerfil}>{user.nickname}</span>
          <span className='username' onClick={goPerfil}>{user.username}</span>
          <span className="fecha">{convertDate(createAt)}</span>
        </div>
        {username == user.username ? (
          <>
            {show && <ListOptions id={id} option={'image'}/>}
            <Bars3Icon className='bar_icon' onClick={()=>setShow(!show)}/>
          </>
        ) : null}
      </div>
      <div className="image_area">
        <p>{description}</p>
        <img
          onClick={() => navigate(`/image?myimage=${id}`)}
          src={urlImage}
          alt=""
          className='image'
        />
        <span className='coment'>Comments {coments}</span>
      </div>
    </div>
  );
}
