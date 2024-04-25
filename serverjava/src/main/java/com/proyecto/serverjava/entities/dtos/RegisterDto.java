package com.proyecto.serverjava.entities.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDto {
    @NotBlank
    @Size(max = 50)
    private String username;

    @NotBlank
    @Size(max = 50)
    private String nickname;

    @NotBlank
    private String password;

    @NotBlank
    @Size(max = 280)
    private String description;

    @NotBlank
    private String perfilImage;
}
