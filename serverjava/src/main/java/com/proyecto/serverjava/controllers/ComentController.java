package com.proyecto.serverjava.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.proyecto.serverjava.components.ValidationComponent;
import com.proyecto.serverjava.entities.Coments;
import com.proyecto.serverjava.services.interfacesService.ComentService;

import jakarta.validation.Valid;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/coment")
public class ComentController {

    @Autowired
    private ComentService comentService;

    @Autowired
    private ValidationComponent validationComponent;

    @PostMapping("/{id}")
    public ResponseEntity<?> addComents(@Valid @RequestBody Coments coment, BindingResult result, @PathVariable UUID id,
            @RequestAttribute String username) {
        if (result.hasFieldErrors())
            return validationComponent.vlidation(result);
        var res = comentService.createComent(id, coment, username);
        return ResponseEntity.status(201).body(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComent(@PathVariable UUID id, @RequestAttribute String username) {
        comentService.deleteComent(id, username);
        return ResponseEntity.noContent().build();
    }

}
