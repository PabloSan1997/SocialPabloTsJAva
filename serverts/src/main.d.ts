

interface RegisterDto {
    username: string;
    nickname: string;
    password: string;
    description: string;
    perfilImage: string;
}


interface LoginDto {
    username: string;
    password: string;
}


interface TokenObject {
    username: string,
    sub: string,
    authorities: string
}

interface PreTakenObject {
    username: string,
    authorities: {
        authority: string
    }[]
}

interface AddImageDto {
    description: string;
    urlImage: string;
}
