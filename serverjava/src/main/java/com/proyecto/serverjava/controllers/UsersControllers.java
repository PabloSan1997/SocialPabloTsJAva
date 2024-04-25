package com.proyecto.serverjava.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.proyecto.serverjava.components.ValidationComponent;
import com.proyecto.serverjava.entities.dtos.RegisterDto;
import com.proyecto.serverjava.services.interfacesService.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/user")
public class UsersControllers {
    
    @Autowired
    private UserService userService;

    @Autowired
    private ValidationComponent validationComponent;

    @GetMapping("/perfil")
    public ResponseEntity<?> freindPerfil(@RequestAttribute String username) {
        var res = userService.findPerfil(username);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/perfil/{userFriend}")
    public ResponseEntity<?> findFreind(@RequestAttribute String username, @PathVariable String userFriend) {
        var res = userService.findFriend(username, userFriend);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto entity, BindingResult result) {
        if(result.hasFieldErrors()) return validationComponent.vlidation(result);
        var user = userService.register(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @DeleteMapping("")
    public ResponseEntity<?> register(@RequestAttribute String username) {
        userService.deleteCount(username);
        return ResponseEntity.noContent().build();
    }

}
