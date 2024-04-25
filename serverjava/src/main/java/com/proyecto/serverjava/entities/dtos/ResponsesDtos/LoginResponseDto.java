package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import lombok.Data;

@Data
public class LoginResponseDto {
    private String token;
    private String username;
}
