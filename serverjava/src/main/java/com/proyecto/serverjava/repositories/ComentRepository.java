package com.proyecto.serverjava.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.serverjava.entities.Coments;

@Repository
public interface ComentRepository extends CrudRepository<Coments, UUID>{
    
    @Query("select count(p.id) from Coments p where p.image.id=?1")
    int countComents(UUID id);

    @Query("select c from Coments c where c.image.id = ?1 order by c.createAt")
    List<Coments> findComentsByIdImageOrder(UUID id);

}
