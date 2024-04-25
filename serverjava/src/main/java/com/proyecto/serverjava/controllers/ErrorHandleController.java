package com.proyecto.serverjava.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.proyecto.serverjava.entities.dtos.BoomDto;
import com.proyecto.serverjava.exceptions.NotFoundDeleteException;
import com.proyecto.serverjava.exceptions.NotroleException;
import com.proyecto.serverjava.exceptions.UserException;

@RestControllerAdvice
public class ErrorHandleController {
    
    @ExceptionHandler({UserException.class})
    public ResponseEntity<BoomDto> usuarioExistente(Exception e){
        int statusCode = HttpStatus.BAD_REQUEST.value();
        BoomDto boomDto = new BoomDto(
            statusCode, 
            "Bad request", 
            e.getMessage()
            );
        return ResponseEntity.status(statusCode).body(boomDto);
    }


    @ExceptionHandler({NotroleException.class})
    public ResponseEntity<BoomDto> badimplementation(Exception e){
        int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        BoomDto boomDto = new BoomDto(
            statusCode, 
            "Internal server error", 
            e.getMessage()
            );
        return ResponseEntity.status(statusCode).body(boomDto);
    }

    @ExceptionHandler({NotFoundDeleteException.class})
    public ResponseEntity<BoomDto> notFound(Exception e){
        int statusCode = HttpStatus.NOT_FOUND.value();
        BoomDto boomDto = new BoomDto(
            statusCode, 
            "Not foung", 
            e.getMessage()
            );
        return ResponseEntity.status(statusCode).body(boomDto);
    }

}
