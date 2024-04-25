package com.proyecto.serverjava.services.interfacesService;



import com.proyecto.serverjava.entities.dtos.RegisterDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.PerfilDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.PerfilFreindDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.RegisterResponseDto;

public interface UserService {
   RegisterResponseDto register(RegisterDto registerDto);
   void deleteCount(String username);
   PerfilDto findPerfil(String username);
   PerfilFreindDto findFriend(String username, String userFriend);
} 
