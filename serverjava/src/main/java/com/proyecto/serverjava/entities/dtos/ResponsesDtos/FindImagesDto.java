package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import java.util.List;

import lombok.Data;

@Data
public class FindImagesDto {
    private DataInfoDto dataInfo;
    private List<ImageCountComentDto> images;
}
