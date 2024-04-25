import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReadApi } from "../../api/readApi";


const readApi = new ReadApi();

export const loginExtraReducer = createAsyncThunk(
    'extraReducer/Login',
    async(data:LoginRequest):Promise<LoginResponse>=>{
        try {
            return readApi.login(data);
        } catch (error) {
            throw error as BoomError;
        }
    }
);

export const homeExtraReducer = createAsyncThunk(
    'extraReducer/home',
    async({token}:{token:string})=>{
        return readApi.readHome(token);
    }
);

export const addImageExtrareducer = createAsyncThunk(
    'extraReducer/addImage',
    async({token, data}:{token:string, data:AddImage})=>{
        try {
            return readApi.addNewImage(data, token);
        } catch (error) {
            const boom = error as BoomError;
            throw boom.message;
        }
    }
);

export const readPerfilExtrareducer = createAsyncThunk(
    'extraReducer/findPerfil',
    async ({token}:{token:string})=>{
        try {
            const data = await readApi.readPerfil(token);
            return data;
        } catch (error) {
            throw error as BoomError;
        }
    }
);

export const readPerfilFriendExtrareducer = createAsyncThunk(
    'extraReducer/findFreindPerfil',
    async ({token, username}:{token:string, username:string})=>{
        try {
            const data = await readApi.readPerfilFriend(token, username);
            return data;
        } catch (error) {
            throw error as BoomError;
        }
    }
);


export const registerExtraReducer = createAsyncThunk(
    'extraReducer/register',
    async(newUser:RegisterRequest)=>{
        try {
           return await readApi.createUser(newUser);
        } catch (error) {
            throw error as BoomError;
        }
    }
);