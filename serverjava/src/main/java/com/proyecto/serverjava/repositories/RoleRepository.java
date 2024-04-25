package com.proyecto.serverjava.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.serverjava.entities.Roles;

@Repository
public interface RoleRepository extends CrudRepository<Roles, UUID> {
    Optional<Roles> findByName(String name);
}
