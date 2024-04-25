/// <reference types="vite/client" />



interface ListOptionInterface{
    option:'image'|'coment',
    id:string;
}

interface RenderUserInfo{
    username:string;
    nickname:string;
    urlPerfil:string;
    id_user:string;
    createAt:string;
}

type Children = {
    children:JSX.Element|JSX.Element[]
}

interface AddImage {
    description: string;
    urlImage:    string;
}


interface InitialState  {
    token:string,
    dataInfo:DataInfo|null,
    imagenes:ImageComentCount[],
    oneImage:Images|null,
    perfil:MainPerfil|null,
    message:string
}

interface LoginResponse {
    token: string;
    username: string;
}

interface BoomError {
    statucCode: number;
    error:      string;
    message:    string;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface FriendPerfil {
    dataInfo: DataInfo;
    perfil:   MainPerfil;
}

interface MainPerfilUserInfo {
    id:          string;
    description: string;
    perfilImage: string;
}



interface HomeResponse {
    dataInfo: DataInfo;
    images: ImageComentCount[];
}

interface RegisterRequest {
    username: string;
    nickname: string;
    password: string;
    description: string;
    perfilImage: string;
}

interface ComentCreate {
    coment: string;
}

interface ImageCreate {
    description: string;
    urlImage: string;
}

interface DataInfo {
    username: string;
    nickname: string;
}

interface ImageComentCount {
    id: string;
    description: string;
    urlImage: string;
    createAt:string;
    user: UserImage;
    coments: number;
}

interface UserImage {
    id: string;
    username: string;
    nickname: string;
    userInfo: UserInfo;
}

interface UserInfo {
    perfilImage: string;
}


interface ImageByIdResponse {
    dataInfo: DataInfo;
    images:   Images;
}


 interface Images {
    id:          string;
    description: string;
    urlImage:    string;
    createAt:    string;
    user:        UserImage;
    coments:     Coment[];
}
 interface Coment {
    id:       string;
    coment:   string;
    createAt: string;
    user:    UserImage;
}

 interface UserInfo {
    perfilImage: string;
}


interface MainPerfil {
    id:       string;
    username: string;
    nickname: string;
    userInfo: MainPerfilUserInfo;
    images:   ImageComentCount[];
}
