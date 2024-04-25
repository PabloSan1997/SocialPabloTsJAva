/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Header } from "../components/Header";
import { PerfilSeccion } from "../components/PerfilSeccion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Navigate, useParams } from "react-router-dom";
import { readPerfilExtrareducer, readPerfilFriendExtrareducer } from "../slices/extraReducers/userExtraReducers";

export function Perfil() {
  const params = useParams();
  const state = useAppSelector(state => state.socialReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!params.username) {
      dispatch(readPerfilExtrareducer({ token: state.token }));
    } else{
      dispatch(readPerfilFriendExtrareducer({token:state.token, username:params.username}))
    }
  }, [params.username]);

  if (!state.token) return <Navigate to={'/login'} />
  return (
    <>
      <Header isLoggin={true} />
      {state.perfil ? <PerfilSeccion perfil={state.perfil} /> : null}
    </>
  );
}
