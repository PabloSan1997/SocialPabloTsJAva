import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteComentExtraReducer, deleteImageExtraReducer } from "../slices/extraReducers/imageExtraReducers";




export function ListOptions({option, id}:ListOptionInterface) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.socialReducer);
  const ejec = () => {
    if(confirm('¿Desea borrar elemento?')){
      if(option == 'image'){
        dispatch(deleteImageExtraReducer({token:state.token, id_image:id}));
      }else if(option == 'coment'){
        dispatch(deleteComentExtraReducer({token:state.token, id_coment:id}))
      }
    }
  }
  return (
    <nav className="list_options">
        <li onClick={ejec}>Borrar</li>
    </nav>
  );
}
