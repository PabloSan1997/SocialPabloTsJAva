import { HashRouter, useRoutes, Navigate} from "react-router-dom";
import { Login } from "./loyouts/Login";
import { useAppSelector } from "./hooks";
import { Home } from "./loyouts/Home";
import { CreateCount } from "./loyouts/CreateCount";
import { OneImage } from "./loyouts/OneImage";
import { Perfil } from "./loyouts/Perfil";

export function Rutas(){
    const token = useAppSelector(state=>state.socialReducer.token);
    const CreateRutas = ()=>useRoutes([
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/',
            element:<Navigate to={!token?'/login':'/home'}/>
        },
        {
            path:'/home',
            element:<Home/>
        },
        {
            path:'/createUser',
            element:<CreateCount/>
        },
        {
            path:"/image",
            element:<OneImage/>
        },
        {
            path:'/perfil',
            element:<Perfil/>
        },
        {
            path:'/perfil/:username',
            element:<Perfil/>
        }
    ]);
    return (
        <HashRouter>
           <CreateRutas/>
        </HashRouter>
    );
}