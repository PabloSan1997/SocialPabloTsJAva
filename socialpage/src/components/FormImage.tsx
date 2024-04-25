

import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addImageExtrareducer } from "../slices/extraReducers/userExtraReducers";
import '../styles/fromImage.scss';

export function FormImage() {
  const [image, setImage] = React.useState<AddImage>({ description: '', urlImage: '' });
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.socialReducer);
  const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImage({ ...image, description: e.target.value });
  }

  const setUrlImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage({ ...image, urlImage: e.target.value });
  }

  const subir = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image.description.length < 280){
      dispatch(addImageExtrareducer({ token: state.token, data: image }));
      setImage({ description: '', urlImage: '' });
    }
      
  }

  return (
    <form
      onSubmit={subir}
      className="from_image"
    >
      <h2>Nueva publicacion</h2>
      <label htmlFor="#imageUrl">Url image</label>
      <input
        type="text"
        className="entrada"
        id="imageUrl"
        placeholder="Escribir"
        value={image.urlImage}
        onChange={setUrlImage}
      />
      <label htmlFor="#description">Descripcion <span>({280 - image.description.length})</span></label>
      <textarea
        className="entrada"
        cols={30} rows={2}
        id="descrition"
        placeholder="Escribir"
        value={image.description}
        onChange={setDescription}
      ></textarea>
      <button type="submit" className="myboton">Postear</button>
      {state.message?<p className="message-error">{state.message}</p>:null}
    </form>
  );
}
