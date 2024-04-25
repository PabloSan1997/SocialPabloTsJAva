

import { Header } from "../components/Header";
import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { FormRegisterUser } from "../components/FormRegisterUser";



export function CreateCount() {
    const state = useAppSelector(state => state.socialReducer);
    
    if (state.token) return <Navigate to={'/home'} />
    return (
        <>
            <Header isLoggin={false} />
           <FormRegisterUser/>
        </>
    );
}
