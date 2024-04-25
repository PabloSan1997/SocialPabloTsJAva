package com.proyecto.serverjava.repositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.serverjava.entities.UserInfo;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo, UUID>{

} 