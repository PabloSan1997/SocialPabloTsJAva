import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";
import { useAppSelector } from "../hooks";
import '../styles/login.scss';

export function Login(){
    const state = useAppSelector(state => state.socialReducer);

    if(state.token) return <Navigate to={'/home'}/>
    return (
        <>
            <Header isLoggin={false}/>
            <LoginForm/>
        </>
    );
}