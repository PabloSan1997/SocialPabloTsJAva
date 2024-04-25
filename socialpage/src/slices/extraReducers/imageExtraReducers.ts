import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReadApi } from "../../api/readApi";

const readApi = new ReadApi();
export const oneImageExtraReducer = createAsyncThunk(
    'extraReducer/selectOneImage',
    async({token, id_image}:{token:string, id_image:string})=>{
        try {
            return readApi.readOneImage(token, id_image);
        } catch (error) {
            throw error as string;
        }
    }
);


export const createCommentExtraReduce = createAsyncThunk(
    'extraReducer/createComment',
    async({token, id_image, coment}:{token:string, id_image:string, coment:{coment:string}})=>{
        try {
            const datos = await readApi.createComent(token, coment, id_image);
            return datos;
        } catch (error) {
            throw error as string;
        }
    }
);

export const deleteImageExtraReducer = createAsyncThunk(
    'extraReducer/deleteImage',
    async({token, id_image}:{token:string, id_image:string})=>{
        try {
             await readApi.deleteImage(token, id_image);
        } catch (error) {
            throw error as string;
        }
    }
);

export const deleteComentExtraReducer = createAsyncThunk(
    'extraReducer/deleteComent',
    async({token, id_coment}:{token:string, id_coment:string})=>{
        try {
             await readApi.deleteComent(token, id_coment);
        } catch (error) {
            throw error as string;
        }
    }  
);