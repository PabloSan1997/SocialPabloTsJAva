package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import lombok.Data;

@Data
public class UserInfoPerfilDto {
    private String perfilImage;


    public UserInfoPerfilDto(){
       
    }

    public UserInfoPerfilDto(String perfilImage){
        this.perfilImage = perfilImage;
    }
}
