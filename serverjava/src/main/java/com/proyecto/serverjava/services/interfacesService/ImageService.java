package com.proyecto.serverjava.services.interfacesService;


import java.util.UUID;

import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.FindImagesDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.FindOneImage;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.MessageElementDto;

public interface ImageService {
    MessageElementDto addImage(Image newImage, String username);
    void deleteImage(UUID id, String username);
    FindImagesDto findImages(String username);
    FindOneImage findOneImage(UUID id, String username);
}
