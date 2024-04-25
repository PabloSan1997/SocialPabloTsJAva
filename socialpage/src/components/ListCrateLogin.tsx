import { Link, useLocation } from "react-router-dom";



export function ListCreateLogin(){
    const location = useLocation();
    const isLogin = location.pathname=='/login';
    if(isLogin) return <Link className="headerBotons" to={'/createUser'}>Create Count</Link>;
    return <Link className="headerBotons" to={'/login'}>Login</Link>
}