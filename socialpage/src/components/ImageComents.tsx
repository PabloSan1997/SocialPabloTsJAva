

// import React from "react";

import { useNavigate } from "react-router-dom";
import { MyComents } from "./MyComents";
import { FormComents } from "./FormComents";
import '../styles/oneImage.scss';
import { UserInfo } from "./UserInfo";

export function ImagenComents({ user, description, urlImage, id, coments, createAt }: Images) {
  const navigate = useNavigate();
  return (
    <div className="caja-one">
      <div className="image_area">
        <div className="my_image">
          <img
            onClick={() => navigate(`/image?myimage=${id}`)}
            src={urlImage}
            alt=""
          />
        </div>
        <div className="user_public">
          <UserInfo 
          username={user.username} 
          nickname={user.nickname}
          urlPerfil={user.userInfo.perfilImage}
           id_user={user.id}
           createAt={createAt}
           />
          <p className="desc">{description}</p>
        </div>
      </div>
      <div className="area_coments">
        <FormComents id_image={id} />
        <h3>Comments</h3>
        <div className="the_coments">
          {coments.map(c => (
            <MyComents key={c.id} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
