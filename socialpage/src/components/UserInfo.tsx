import { useNavigate } from 'react-router-dom';
import '../styles/userInfo.scss';
import { convertDate } from '../utilites/converDate';

export function UserInfo({urlPerfil, username, nickname, createAt}:RenderUserInfo){
    const navigate = useNavigate();
    const goPerfil=()=>{
      navigate(`/perfil/${username}`);
    }
    return(
        <div className="my_user">
            <img src={urlPerfil} onClick={goPerfil} alt={username} className='perfil_image' />
            <div className="user_names">
              <span className='nickname' onClick={goPerfil}>{nickname}</span>
              <span className='username' onClick={goPerfil}>{username}</span>
              <span className="fecha">{convertDate(createAt)}</span>
            </div>
          </div>
    );
}