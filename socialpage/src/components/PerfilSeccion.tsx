import { ImagenCountComent } from "./ImagenCountComent";
import '../styles/perfil.scss';

type PerfilImage = {
  perfil: MainPerfil
}

export function PerfilSeccion({ perfil }: PerfilImage) {
  const data: MainPerfilUserInfo = perfil.userInfo;
  return (
    <>
      <div className="conte_perfil">
        <div className="part">
          <img src={data.perfilImage} alt={perfil.username} />
        </div>
        <div className="part user-part">
          <span className="nickname">{perfil.nickname}</span>
          <span className="username">{perfil.username}</span>
          <p className="description">{data.description}</p>
        </div>
      </div>
      <div className="contenedor">
        {perfil.images.map(i => (
          <ImagenCountComent key={i.id} {...i} />
        ))}
      </div>
    </>
  );
}
