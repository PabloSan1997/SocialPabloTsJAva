package com.proyecto.serverjava.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.serverjava.entities.Coments;
import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.entities.Users;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.MessageElementDto;
import com.proyecto.serverjava.exceptions.NotFoundDeleteException;
import com.proyecto.serverjava.exceptions.UserException;
import com.proyecto.serverjava.repositories.ComentRepository;
import com.proyecto.serverjava.repositories.ImageRespitory;
import com.proyecto.serverjava.repositories.UsersRepository;
import com.proyecto.serverjava.services.interfacesService.ComentService;

@Service
public class ComentServiceImp implements ComentService{

    @Autowired
    private ComentRepository comentRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ImageRespitory imageRespitory;

    @Override
    @Transactional
    public MessageElementDto createComent(UUID id_image, Coments newComents, String username) {
        Optional<Image> opImage = imageRespitory.findById(id_image);
        Optional<Users> opUsers = usersRepository.findByUsername(username);
        if(opImage.isEmpty() || opUsers.isEmpty())
             throw new NotFoundDeleteException("No se encontro usuario o imagen");
        Image image = opImage.orElseThrow();
        Users users = opUsers.orElseThrow();
        newComents.setImage(image);
        newComents.setUsers(users);
        comentRepository.save(newComents);
        return new MessageElementDto("Se agrego comentario con exito");
    }

    @Override
    @Transactional
    public void deleteComent(UUID id_coment, String username) {
        Optional<Coments> oPcoments = comentRepository.findById(id_coment);
        Optional<Users> opUser = usersRepository.findByUsername(username);
        if(oPcoments.isEmpty() || opUser.isEmpty()) throw new NotFoundDeleteException("No se encontro usuario o comentario");
        Coments coments = oPcoments.orElseThrow();
        Users users = opUser.orElseThrow();
        String mainUser = users.getUsername();
        String viewUsername = coments.getUsers().getUsername();
        String viewImageUsername = coments.getImage().getUsers().getUsername();
        if(viewUsername != mainUser && viewImageUsername!=mainUser) throw new UserException("No se encontro usuario");
        comentRepository.deleteById(id_coment);
    }
    
}
