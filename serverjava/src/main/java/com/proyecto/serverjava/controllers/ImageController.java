package com.proyecto.serverjava.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.serverjava.components.ValidationComponent;
import com.proyecto.serverjava.entities.Image;
import com.proyecto.serverjava.services.interfacesService.ImageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    
    @Autowired
    private ImageService imageService;

    @Autowired
    private ValidationComponent validationComponent;

    @GetMapping("")
    public ResponseEntity<?> findImage(@RequestAttribute String username){
        var data = imageService.findImages(username);
        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findImage(@PathVariable UUID id ,@RequestAttribute String username){
        var data = imageService.findOneImage(id, username);
        return ResponseEntity.ok().body(data);
    }

    @PostMapping("/addImage")
    public ResponseEntity<?> addImage(@Valid @RequestBody Image newImage, BindingResult result, @RequestAttribute String username){
        if(result.hasFieldErrors()) return validationComponent.vlidation(result);
        var response = imageService.addImage(newImage, username);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable UUID id, @RequestAttribute String username){
        imageService.deleteImage(id, username);
        return ResponseEntity.noContent().build();
    }

}
