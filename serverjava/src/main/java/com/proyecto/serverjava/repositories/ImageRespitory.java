package com.proyecto.serverjava.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.serverjava.entities.Image;

@Repository
public interface ImageRespitory extends CrudRepository<Image, UUID>{
    
    @Query("select i from Image i where i.id=?1 and i.users.username=?2")
    Optional<Image> findByUsernameAndId(UUID id, String username);

    @Query("select i from Image i order by i.createAt desc")
    List<Image> findImageOrder();

}
