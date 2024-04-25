package com.proyecto.serverjava.components;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import com.proyecto.serverjava.entities.dtos.BoomDto;

@Component
public class ValidationComponent {

    public ResponseEntity<?> vlidation(BindingResult result) {
        int status = HttpStatus.BAD_REQUEST.value();
        BoomDto error = new BoomDto(status, "Bad request", null);
        String message = "";
        var data = result.getFieldErrors();
        for (var fieldError : data) {
            message += fieldError.getField()+" "+fieldError.getDefaultMessage() + " ";
        }
        error.setMessage(message);
        return ResponseEntity.badRequest().body(error);
    }
    
}
