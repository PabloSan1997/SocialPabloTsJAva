import { useAppDispatch } from "../hooks";
import { socialActions } from "../slices/socialSlice";
import { MainUserInfo } from "./MainUserInfo";
import { ListCreateLogin } from "./ListCrateLogin";
import { useNavigate } from "react-router-dom";
import '../styles/header.scss';


export function Header({ isLoggin }: { isLoggin: boolean }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(socialActions.logout());
    }
    return (
        <header>
            <h1
                onClick={() => navigate('/home')}
            >Mi Socail</h1>
            <div className="area_info">
                <MainUserInfo />
                {isLoggin ? (
                    <button
                        className="headerBotons"
                        onClick={logout}
                    >Log out</button>
                ) : (
                    <ListCreateLogin />
                )}
            </div>
        </header>
    );
}