package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class ComentsDto {
    private UUID id;
    private String coment;
    private Date createAt;
    private SeconUserDto user;

    public ComentsDto(UUID id, String coment, Date createAt) {
        this.id = id;
        this.coment = coment;
        this.createAt = createAt;
    }

}
