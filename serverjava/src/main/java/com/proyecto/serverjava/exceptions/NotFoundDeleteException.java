package com.proyecto.serverjava.exceptions;

public class NotFoundDeleteException extends RuntimeException{
    public NotFoundDeleteException(String message){
        super(message);
    }
}
