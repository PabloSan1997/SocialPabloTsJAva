package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.proyecto.serverjava.entities.Roles;
import com.proyecto.serverjava.entities.UserInfo;
import lombok.Data;

@Data
public class RegisterResponseDto {
    
    private UUID id;
    private String username;
    private String nickname;

    @JsonIgnoreProperties({"users"})
    private List<Roles> roles;

    @JsonIgnoreProperties({"user"})
    private UserInfo userInfo;

    public RegisterResponseDto(UUID id, String username, String nickname) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
    }

    
}
