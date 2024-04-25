package com.proyecto.serverjava.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "user_info")
@Data
public class UserInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 280)
    private String description;

    @Column(length = 5000, name="perfil_image")
    private String perfilImage;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties({"userInfo"})
    private Users user;
}
