package com.proyecto.serverjava.exceptions;

public class NotroleException extends RuntimeException{
    public NotroleException(){
        super("An internal server error occurred");
    }
}
