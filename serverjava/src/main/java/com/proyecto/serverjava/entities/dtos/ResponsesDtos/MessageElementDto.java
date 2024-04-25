package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import lombok.Data;

@Data
public class MessageElementDto {
    private String message;

    public MessageElementDto() {
        this.message = "Se agregó elemento con exito";
    }

    public MessageElementDto(String message) {
        this.message = message;
    }
}
