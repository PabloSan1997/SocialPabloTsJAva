package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import java.util.UUID;

import lombok.Data;

@Data
public class SeconUserDto {
    private UUID id;
    private String username;
    private String nickname;
    private UserInfoPerfilDto userInfo;

    public SeconUserDto(UUID id, String username, String nickname, String perfilImage){
        this.id = id;
        this.username = username;
        this.nickname = nickname;
        this.userInfo = new UserInfoPerfilDto(perfilImage);
    }
}
