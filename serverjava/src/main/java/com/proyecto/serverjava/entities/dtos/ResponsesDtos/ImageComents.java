package com.proyecto.serverjava.entities.dtos.ResponsesDtos;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class ImageComents {
    private UUID id;
    private String description;
    private String urlImage;
    private Date createAt;
    private SeconUserDto user;
    private List<ComentsDto> coments;

    public ImageComents(UUID id, String description, String urlImage, Date createAt) {
        this.id = id;
        this.description = description;
        this.urlImage = urlImage;
        this.createAt = createAt;
    }
}
