package com.proyecto.serverjava.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoomDto {
    private Integer statucCode;
    private String error;
    private String message;
}
