import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addImageExtrareducer, homeExtraReducer, loginExtraReducer, readPerfilExtrareducer, readPerfilFriendExtrareducer, registerExtraReducer } from "./extraReducers/userExtraReducers";
import { tokenStorage } from "../utilites/storage";
import { createCommentExtraReduce, deleteComentExtraReducer, deleteImageExtraReducer, oneImageExtraReducer } from "./extraReducers/imageExtraReducers";


const initialState:InitialState = {
    token: !tokenStorage.read()?'':tokenStorage.read(),
    dataInfo: null,
    imagenes: [],
    oneImage: null,
    perfil: null,
    message:''
}

const socialSlice = createSlice({
    name:'slice/Social',
    initialState,
    reducers:{
        addToken:(state, action:PayloadAction<{token:string}>)=>{
            state.token = action.payload.token;
        },
        logout:(state)=>{
            state.token='';
            tokenStorage.save('');
            
        },
        addMessage(state, action:PayloadAction<{message:string}>){
            state.message = action.payload.message;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginExtraReducer.fulfilled, (state, action)=>{
            state.token = action.payload.token;
            state.message = '';
            tokenStorage.save(action.payload.token);
        });
        builder.addCase(loginExtraReducer.rejected, (state, action)=>{
            const error = action.error.message;
            state.message = error?error:'';
            state.token = '';
            tokenStorage.save('');
        });

        builder.addCase(homeExtraReducer.fulfilled, (state, action)=>{
            state.dataInfo = action.payload.dataInfo;
            state.imagenes = action.payload.images;
            state.oneImage=null;

        });
        builder.addCase(homeExtraReducer.rejected, (state)=>{
            state.dataInfo = {
                username:'',
                nickname:''
            };
            state.token = '';
            tokenStorage.save('');
            state.imagenes = [];
        });

        builder.addCase(addImageExtrareducer.fulfilled, (state, action)=>{
            state.imagenes = action.payload.images;
            state.message = '';
        });
        builder.addCase(addImageExtrareducer.rejected, (state, action)=>{
            state.message = action.error.message ?? 'Problemas al agregar imagen';
        });

        builder.addCase(oneImageExtraReducer.fulfilled, (state, action)=>{
            state.oneImage = action.payload.images;
            state.dataInfo = action.payload.dataInfo;
            state.imagenes = [];
        });
        builder.addCase(oneImageExtraReducer.rejected, (state)=>{
            state.oneImage = null;
            state.dataInfo = null;
            state.imagenes = [];
            state.token = '';
        })

        builder.addCase(createCommentExtraReduce.fulfilled, (state, actions)=>{
            if(state.oneImage) state.oneImage.coments = actions.payload.images.coments;
        });

        builder.addCase(readPerfilExtrareducer.fulfilled, (state, action)=>{
            const {nickname, username} = action.payload;
            const datainfo = {nickname, username};
            state.dataInfo = datainfo;
            state.perfil = action.payload;
            state.imagenes = [];
            state.message='';
            state.oneImage=null;
        });
        builder.addCase(readPerfilExtrareducer.rejected, (state)=>{
            state.dataInfo = null;
            state.perfil = null;
            state.imagenes = [];
            state.message='';
            state.oneImage=null;
            state.token = '';
        });

        builder.addCase(readPerfilFriendExtrareducer.fulfilled, (state, action)=>{
            state.dataInfo = action.payload.dataInfo;
            state.perfil = action.payload.perfil;
            state.imagenes = [];
            state.message='';
            state.oneImage=null;
        });
        builder.addCase(readPerfilFriendExtrareducer.rejected, (state)=>{
            state.dataInfo = null;
            state.perfil = null;
            state.imagenes = [];
            state.message='';
            state.oneImage=null;
            state.token = '';
        });

        builder.addCase(deleteImageExtraReducer.fulfilled, ()=>{
            window.location.reload();
        });

        builder.addCase(deleteComentExtraReducer.fulfilled, ()=>{
            window.location.reload();
        });

        builder.addCase(registerExtraReducer.fulfilled, (state, action)=>{
            state.token = action.payload.token;
            tokenStorage.save(action.payload.token);
            state.message = '';
        });
        builder.addCase(registerExtraReducer.rejected, (state, action)=>{
            state.token = '';
            state.message = action.error.message as string;
        });
    }
});


const socialReducer = socialSlice.reducer;
const socialActions = socialSlice.actions;

export {
    socialReducer,
    socialActions
}