


export class ReadApi{
    private urlApi = 'http://localhost:3009';
    private prefix = 'Bearer';
    async login(data:LoginRequest):Promise<LoginResponse>{
        const ft = await fetch(this.urlApi+'/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        if(!ft.ok) {
            const data = await ft.json() as BoomError;
            throw data.message;
        }
        return ft.json();
    }

    async readHome(token:string):Promise<HomeResponse>{
        const ft = await fetch(`${this.urlApi}/api/image`, {
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        if(!ft.ok) {
            const data = await ft.json() as BoomError;
            throw data.message;
        }
        return ft.json();
    }
    
    async addNewImage(data:AddImage, token:string):Promise<HomeResponse>{
        const ft = await fetch(`${this.urlApi}/api/image/addImage`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`${this.prefix} ${token}`
            },
            body:JSON.stringify(data)
        });
        if(ft.ok){
            return this.readHome(token);
        }
        throw await ft.json();
    }

    async readOneImage(token:string, id_image:string):Promise<ImageByIdResponse>{
        const ft = await fetch(`${this.urlApi}/api/image/${id_image}`, {
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        if(!ft.ok) {
            const data = await ft.json() as BoomError;
            throw data.message;
        }
        return ft.json();
    }

    async createComent(token:string, coment:{coment:string}, id_image:string):Promise<ImageByIdResponse>{
        const ft = await fetch(`${this.urlApi}/api/coment/${id_image}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(coment)
        });

        if(ft.ok){
            return this.readOneImage(token, id_image);
        } 

        throw 'Problemas al agregar elementos';
    }

    async readPerfil(token:string):Promise<MainPerfil>{
        const ft = await fetch(`${this.urlApi}/api/user/perfil`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(!ft.ok) throw ft.json();

        return ft.json();
    }

    async readPerfilFriend(token:string, username:string):Promise<FriendPerfil>{
        const ft = await fetch(`${this.urlApi}/api/user/perfil/${username}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(!ft.ok) throw ft.json();

        return ft.json();
    }
    async deleteImage(token:string, id_image:string):Promise<void>{
        const ft = await fetch(`${this.urlApi}/api/image/${id_image}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(!ft.ok) throw ft.json();
    }
    
    async deleteComent(token:string, id_coment:string){
        const ft = await fetch(`${this.urlApi}/api/coment/${id_coment}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(!ft.ok) throw ft.json();
    }

    async createUser(newUser:RegisterRequest):Promise<{token:string}>{
        const ft = await fetch(`${this.urlApi}/api/user/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser)
        });
        if(!ft.ok) throw await ft.json() as BoomError;
        const loginUser:LoginRequest = {
            username:newUser.username,
            password:newUser.password
        }
        const log = await this.login(loginUser);
        return {token:log.token};
    }

}