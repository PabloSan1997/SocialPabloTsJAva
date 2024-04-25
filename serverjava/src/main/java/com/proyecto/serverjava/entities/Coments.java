package com.proyecto.serverjava.entities;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "coments")
@Data
public class Coments {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 280)
    @NotBlank
    @Size(max=280)
    private String coment;

    private Date createAt;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties({"coments"})
    private Users users;

    @ManyToOne()
    @JoinColumn(name = "id_image")
    @JsonIgnoreProperties({"coments"})
    private Image image;


    @PrePersist
    public void prePersist(){
        createAt = new Date();
    }

}
