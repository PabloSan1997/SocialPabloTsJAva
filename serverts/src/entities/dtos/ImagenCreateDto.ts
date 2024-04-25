
interface UserShow {
    id: string,
    username: string,
    nickname: string
}
interface ImageShow {
    id: string,
    urlImage: string,
    description: string,
    createAt: Date
}

export class ImagenCreateDtos {
    description: string;
    urlImage: string;
    user: UserShow;
    id: string;
    createAt: Date;
    coments = [];

    constructor(data:ImageShow, { id, username, nickname }: UserShow) {
        this.id = data.id;
        this.description = data.description;
        this.user = {
            id,
            username,
            nickname
        }
        this.createAt = data.createAt;
        this.urlImage = data.urlImage;
    }

}