/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginExtraReducer } from "../slices/extraReducers/userExtraReducers";
import { socialActions } from "../slices/socialSlice";



export function LoginForm(){
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.socialReducer);
    const [textLogin, setTextLogin] = React.useState<LoginRequest>({
        username:'',
        password:''
    });
    React.useEffect(()=>{
        dispatch(socialActions.addMessage({message:''}));
    },[]);
    const setUsername=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextLogin({...textLogin, username:e.target.value});
    }

    const setPassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextLogin({...textLogin, password:e.target.value});
    }

    const submit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(loginExtraReducer(textLogin));
    }
    return(
        <form onSubmit={submit} className="from_login"> 
        <h2>Login</h2>
            <label htmlFor="username">Username</label>
            <input type="text" 
            id="username" 
            placeholder="Escribir..."
            value={textLogin.username}
            onChange={setUsername}
            className="entrada"
            />
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            placeholder="Escribir..."
            value={textLogin.password}
            onChange={setPassword}
            className="entrada"
            />
            <button type="submit" className="boton_subir myboton">Login</button>
            {state.message?(
                <p className="message">{state.message}</p>
            ):null}
        </form>
    );
}