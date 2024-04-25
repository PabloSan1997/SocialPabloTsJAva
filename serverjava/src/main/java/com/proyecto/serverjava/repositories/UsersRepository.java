package com.proyecto.serverjava.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.serverjava.entities.Users;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.DataInfoDto;


@Repository
public interface UsersRepository extends CrudRepository<Users, UUID>{
   
    Optional<Users> findByUsername(String username);
    
    @Query("select new com.proyecto.serverjava.entities.dtos.ResponsesDtos.DataInfoDto(i.username, i.nickname) from Users i where i.username=?1")
    Optional<DataInfoDto> findDataInfo(String username);

}
