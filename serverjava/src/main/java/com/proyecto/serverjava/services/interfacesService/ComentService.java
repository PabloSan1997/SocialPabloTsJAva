package com.proyecto.serverjava.services.interfacesService;

import java.util.UUID;

import com.proyecto.serverjava.entities.Coments;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.MessageElementDto;

public interface ComentService {
    MessageElementDto createComent(UUID id_image, Coments newComents, String username);
    void deleteComent(UUID id_coment, String username);
}
