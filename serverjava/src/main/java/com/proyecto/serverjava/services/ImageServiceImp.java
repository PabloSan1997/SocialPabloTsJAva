package com.proyecto.serverjava.services;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.serverjava.components.CreateImageCountComentDtoCompent;
import com.proyecto.serverjava.entities.Coments;
import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.entities.Users;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.ComentsDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.DataInfoDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.FindImagesDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.FindOneImage;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.ImageComents;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.ImageCountComentDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.MessageElementDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.SeconUserDto;
import com.proyecto.serverjava.exceptions.NotFoundDeleteException;
import com.proyecto.serverjava.exceptions.UserException;
import com.proyecto.serverjava.repositories.ComentRepository;
import com.proyecto.serverjava.repositories.ImageRespitory;
import com.proyecto.serverjava.repositories.UsersRepository;
import com.proyecto.serverjava.services.interfacesService.ImageService;

@Service
public class ImageServiceImp implements ImageService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ImageRespitory imageRespitory;

    @Autowired
    private ComentRepository comentRepository;

    @Autowired
    private CreateImageCountComentDtoCompent createComentDtoCompent;

    @Override
    @Transactional
    public MessageElementDto addImage(Image newImage, String username) {
        Optional<Users> oPuser = usersRepository.findByUsername(username);
        if (oPuser.isEmpty())
            throw new UserException("No se encontro usuario");
        Users user = oPuser.orElseThrow();

        newImage.setUsers(user);
        imageRespitory.save(newImage);

        return new MessageElementDto("Imagen agregada con éxito");
    }

    @Override
    @Transactional
    public void deleteImage(UUID id, String username) {
        Optional<Image> optional = imageRespitory.findByUsernameAndId(id, username);
        optional.ifPresent(im -> {
            imageRespitory.deleteById(im.getId());
        });
        if (optional.isEmpty())
            throw new NotFoundDeleteException("No se encontro elemento para borrar");
    }

    @Override
    @Transactional
    public FindImagesDto findImages(String username) {
        Optional<DataInfoDto> opUser = usersRepository.findDataInfo(username);

        if (opUser.isEmpty())
            throw new UserException("No puedes acceder");

        var data = new FindImagesDto();
        data.setDataInfo(opUser.orElseThrow());

        List<Image> images = (List<Image>) imageRespitory.findImageOrder();
        List<ImageCountComentDto> response = createComentDtoCompent.generateImageCountComentDto(images, comentRepository);
        
        data.setImages(response);

        return data;
    }

    @Override
    @Transactional
    public FindOneImage findOneImage(UUID id, String username) {
        Optional<Users> oPusers = usersRepository.findByUsername(username);
        if(oPusers.isEmpty()) throw new NotFoundDeleteException("No puedes acceder");
        Users users = oPusers.orElseThrow();
        DataInfoDto dataInfo = new DataInfoDto(username, users.getNickname());

        var data = new FindOneImage();
        data.setDataInfo(dataInfo);

        Optional<Image> opImage = imageRespitory.findById(id);
        if(opImage.isEmpty()) throw new NotFoundDeleteException("No se encontro imagen");

        Image image = opImage.orElseThrow();
        
        ImageComents imageComents = new ImageComents(image.getId(), image.getDescription(), image.getUrlImage(), image.getCreateAt());

        Users iUser = image.getUsers();
        SeconUserDto sUserDto = new SeconUserDto(iUser.getId(), iUser.getUsername(), iUser.getNickname(), iUser.getUserInfo().getPerfilImage());

        List<Coments> coments = comentRepository.findComentsByIdImageOrder(id);

        List<ComentsDto> comentsDto = coments.stream().map(c->{
            var mira = new ComentsDto(
                c.getId(),
                c.getComent(),
                c.getCreateAt()
            );
            mira.setUser(
                new SeconUserDto(
                    c.getUsers().getId(), 
                    c.getUsers().getUsername(), 
                    c.getUsers().getNickname(), 
                    c.getUsers().getUserInfo().getPerfilImage())
            );
            return mira;
        }).toList(); 

        

        imageComents.setUser(sUserDto);
        imageComents.setComents(comentsDto);

        data.setImages(imageComents);
        return data;
    }

}
