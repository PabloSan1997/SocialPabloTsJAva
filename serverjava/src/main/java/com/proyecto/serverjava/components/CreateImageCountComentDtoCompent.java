package com.proyecto.serverjava.components;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.ImageCountComentDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.SeconUserDto;
import com.proyecto.serverjava.repositories.ComentRepository;

@Component
public class CreateImageCountComentDtoCompent {
    

    public List<ImageCountComentDto> generateImageCountComentDto(List<Image> images, ComentRepository comentRepository){
        List<ImageCountComentDto> response = new ArrayList<ImageCountComentDto>();

        for (Image im : images) {
            ImageCountComentDto imageCountDto = new ImageCountComentDto(
                im.getId(), 
                im.getDescription(), 
                im.getUrlImage(), 
                im.getCreateAt()
                );
            int coments = comentRepository.countComents(im.getId());
            imageCountDto.setComents(coments);

            SeconUserDto second = new SeconUserDto(
                im.getUsers().getId(),
                im.getUsers().getUsername(),
                im.getUsers().getNickname(),
                im.getUsers().getUserInfo().getPerfilImage()
            );
            imageCountDto.setUser(second);

            response.add(imageCountDto);
        }
        return response;
    }
}
