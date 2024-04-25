import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createCommentExtraReduce } from "../slices/extraReducers/imageExtraReducers";
import '../styles/formcoment.scss';

export  function FormComents({id_image}:{id_image:string}) {
  const state = useAppSelector(state => state.socialReducer);
  const [myComent, setComent] = React.useState<string>('');
  const dispatch = useAppDispatch();
    const addComent =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(createCommentExtraReduce({
          token:state.token,
          coment:{coment:myComent},
          id_image
        }));
        setComent('');
    }
  return (
  <form onSubmit={addComent} className="form_coment">
    <label htmlFor="#comentstext">Tu comentario</label>
    <textarea 
    name="" 
    id="comentstext"
      placeholder="Escribir..."
      onChange={e => setComent(e.target.value)}
      value={myComent}
      >{myComent}</textarea>
    <button type='submit' className="boton myboton">Comentar</button>
  </form>)
  ;
}
