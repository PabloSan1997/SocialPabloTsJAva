


export const tokenStorage = {
    save(data:string):void{
        localStorage.asdf = data;
    },
    read():string{
        if(!localStorage.asdf){
            localStorage.asdf = '';
        }
        return localStorage.asdf;
    }
}