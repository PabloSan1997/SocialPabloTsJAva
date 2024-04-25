


export class ComentResponseDto{
    id:string;
    coment:string;
    createAt:Date;
    constructor({id, coment, createAt}:{id:string, coment:string, createAt:Date}){
        this.id=id;
        this.coment=coment;
        this.createAt=createAt;
    }
}