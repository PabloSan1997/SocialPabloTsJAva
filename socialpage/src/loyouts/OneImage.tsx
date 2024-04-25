/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Header } from "../components/Header";

import { useAppDispatch, useAppSelector } from "../hooks";
import { Navigate, useSearchParams } from "react-router-dom";
import { oneImageExtraReducer } from "../slices/extraReducers/imageExtraReducers";
import { ImagenComents } from "../components/ImageComents";


export function OneImage(){
    const state = useAppSelector(state => state.socialReducer);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const id_image = searchParams.get('myimage');

    React.useEffect(()=>{
        if(id_image){
            dispatch(oneImageExtraReducer({token:state.token, id_image}));
        }
    },[]);

    if (!state.token) return <Navigate to={'/login'} />
    
    return(
        <>
            <Header isLoggin={true}/>
            {state.oneImage?.id?(
                <ImagenComents {...state.oneImage}/>
            ):null}
        </>
    );
}