import React from "react";
import '../styles/registerUser.scss';
import { useAppDispatch, useAppSelector } from "../hooks";
import { registerExtraReducer } from "../slices/extraReducers/userExtraReducers";
import { socialActions } from "../slices/socialSlice";

type OptionsField = 'username' | 'nickname' | 'password' | 'description' | 'perfilImage';

const initialOptions: RegisterRequest = {
    username: "",
    nickname: "",
    password: "",
    description: "",
    perfilImage: ""
}

export function FormRegisterUser() {
    const [fields, setField] = React.useState<RegisterRequest>(initialOptions);
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const state = useAppSelector(state => state.socialReducer);
    const dispatch = useAppDispatch();
    const writeField = (data: OptionsField, write: string) => {
        const fl = { ...fields };
        fl[data] = write;
        setField(fl);
    }
    React.useEffect(()=>{
        dispatch(socialActions.addMessage({message:''}));
    },[]);
    const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(fields.description.length<=280 && repeatPassword === fields.password){
            dispatch(registerExtraReducer(fields));
        }
    }

    return (
        <form className="form_register" onSubmit={submitRegister}>
            <h2>Crea tu cuenta</h2>
            <label htmlFor="#rUsername">Username</label>
            <input
                type="text"
                className="entrada"
                id="rUsername"
                value={fields.username}
                onChange={(e) => writeField('username', e.target.value)}
                placeholder="Escribir"
            />
            <label htmlFor="#rNickname">Nickname</label>
            <input
                type="text"
                className="entrada"
                id="rNickname"
                value={fields.nickname}
                onChange={(e) => writeField('nickname', e.target.value)}
                placeholder="Escribir"
            />
            <label htmlFor="#rPassword">Contraseña</label>
            <input
                type="password"
                className="entrada"
                id="rPassword"
                value={fields.password}
                onChange={(e) => writeField('password', e.target.value)}
                placeholder="Escribir"
            />
             <label htmlFor="#rPasswordr">Repetir Contraseña {repeatPassword!=fields.password?'(No coinciden)':null}</label>
            <input
                type="password"
                className="entrada"
                id="rPasswordr"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Escribir"
            />
            <label htmlFor="#rDescription">Description ({280 - fields.description.length})</label>
            <textarea
                className="entrada"
                id="rDescription"
                value={fields.description}
                onChange={(e) => writeField('description', e.target.value)}
                placeholder="Escribir"
            ></textarea>
            <label htmlFor="#rUrlImage">Url image</label>
            <input
                type="text"
                className="entrada"
                id="rUrlImage"
                value={fields.perfilImage}
                onChange={(e) => writeField('perfilImage', e.target.value)}
                placeholder="Escribir"
            />
            <button type="submit" className="myboton rboton">Registrar</button>
            {state.message?<p className="message">{state.message}</p>:null}
        </form>
    );
}
