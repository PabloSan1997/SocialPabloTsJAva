package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import lombok.Data;

@Data
public class DataInfoDto {
    private String username;
    private String nickname;

    public DataInfoDto(String username, String nickname) {
        this.username = username;
        this.nickname = nickname;
    }

}
