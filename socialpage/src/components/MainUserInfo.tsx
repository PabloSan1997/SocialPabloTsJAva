import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getFirstname } from "../utilites/getFirstname";


export function MainUserInfo(){
    const state = useAppSelector( state=> state.socialReducer);
    const navigate = useNavigate();
    if(!state.token) return null;
    return (
            <span className="user_info" onClick={()=>navigate('/perfil')}>{state.dataInfo?.nickname && getFirstname(state.dataInfo?.nickname)}</span>
    );
}