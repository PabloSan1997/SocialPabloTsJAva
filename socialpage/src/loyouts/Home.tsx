/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import { homeExtraReducer } from "../slices/extraReducers/userExtraReducers";
import { ImagenCountComent } from "../components/ImagenCountComent";
import { FormImage } from "../components/FormImage";
import '../styles/home.scss';


export function Home() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.socialReducer);

    React.useEffect(()=>{
        dispatch(homeExtraReducer({token:state.token}));
    },[]);

    if (!state.token) return <Navigate to={'/login'} />
    return (
        <>
            <Header isLoggin={true}/>
            <FormImage/>
            <div className="contenedor">
                {state.imagenes.map(i => (
                    <ImagenCountComent key={i.id} {...i}/>
                ))}
            </div>
        </>
    );
}