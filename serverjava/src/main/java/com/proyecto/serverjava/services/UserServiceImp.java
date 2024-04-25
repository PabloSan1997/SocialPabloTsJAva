package com.proyecto.serverjava.services;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.serverjava.components.CreateImageCountComentDtoCompent;
import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.entities.Roles;
import com.proyecto.serverjava.entities.UserInfo;
import com.proyecto.serverjava.entities.Users;
import com.proyecto.serverjava.entities.dtos.RegisterDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.DataInfoDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.ImageCountComentDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.PerfilDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.PerfilFreindDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.RegisterResponseDto;
import com.proyecto.serverjava.exceptions.NotroleException;
import com.proyecto.serverjava.exceptions.UserException;
import com.proyecto.serverjava.repositories.ComentRepository;
import com.proyecto.serverjava.repositories.RoleRepository;
import com.proyecto.serverjava.repositories.UserInfoRepository;
import com.proyecto.serverjava.repositories.UsersRepository;
import com.proyecto.serverjava.services.interfacesService.UserService;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserInfoRepository infoRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CreateImageCountComentDtoCompent createImageCountComentDtoCompent;

    @Autowired
    private ComentRepository comentRepository;

    @Override
    @Transactional
    public RegisterResponseDto register(RegisterDto registerDto) {
        Optional<Users> usersView = usersRepository.findByUsername(registerDto.getUsername());
        if(usersView.isPresent()) throw new UserException("Username ya existente");

        Optional<Roles> opRole = roleRepository.findByName("ROLE_USER");
        if(opRole.isEmpty()) throw new NotroleException();

        Roles role = opRole.orElseThrow();

        Users user = new Users();
        UserInfo userInfo = new UserInfo();

        userInfo.setDescription(registerDto.getDescription());
        userInfo.setPerfilImage(registerDto.getPerfilImage());
        

        user.setNickname(registerDto.getNickname());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setUsername(registerDto.getUsername());
        user.addRole(role);
        user.setUserInfo(userInfo);

        Users userResponse = usersRepository.save(user);

        userInfo.setUser(userResponse);
        infoRepository.save(userInfo);
        
    var response = new RegisterResponseDto(userResponse.getId(), userResponse.getUsername(),  userResponse.getNickname());

       Optional<Users> userDataOp = usersRepository.findById(userResponse.getId());
       if(userDataOp.isPresent()){
        var userData = userDataOp.orElseThrow();
        response.setRoles(userData.getRoles());
        response.setUserInfo(userData.getUserInfo());
       }
       return response;
    }

    @Override
    @Transactional
    public void deleteCount(String username) {
        Optional<Users> user = usersRepository.findByUsername(username);
        user.ifPresent(u ->{
            usersRepository.deleteById(u.getId());
        });
    }

    @Override
    @Transactional
    public PerfilDto findPerfil(String username) {
        Optional<Users> opUser = usersRepository.findByUsername(username);
        if(opUser.isEmpty()) throw new UserException("No tienes permiso para esto");
        
        Users users = opUser.orElseThrow();

        List<Image> images = users.getImages();

        List<ImageCountComentDto> iComentDtos = createImageCountComentDtoCompent.generateImageCountComentDto(images, comentRepository);

        PerfilDto perfil = new PerfilDto(
            users.getId(),
            users.getUsername(),
            users.getNickname()
        );

        perfil.setUserInfo(users.getUserInfo());
        perfil.setImages(iComentDtos);

        return perfil;


    }

    @Override
    @Transactional
    public PerfilFreindDto findFriend(String username, String userFriend) {
        Optional<Users> opUser = usersRepository.findByUsername(username);
        Optional<Users> opFriend = usersRepository.findByUsername(userFriend);
        if(opFriend.isEmpty() || opUser.isEmpty()) throw new UserException("No se encontro usuario");
        Users user = opUser.orElseThrow();
        Users friend = opFriend.orElseThrow();

        DataInfoDto dataInfo = new DataInfoDto(user.getUsername(), user.getNickname());

        PerfilFreindDto perfilFreindResponse = new PerfilFreindDto();
        perfilFreindResponse.setDataInfo(dataInfo);

        PerfilDto perfilFriendDto = findPerfil(friend.getUsername());

        perfilFreindResponse.setPerfil(perfilFriendDto);

        return perfilFreindResponse;

    }
    
    
}
