package com.proyecto.serverjava.entities;


import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
public class Image {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 280)
    @NotBlank
    @Size(max = 280)
    private String description;

    @Column(length = 5000, name = "url_image")
    @NotBlank
    private String urlImage;

    private Date createAt;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties({"image"})
    private Users users;

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"image"})
    private List<Coments> coments;

    @PrePersist
    public void prePersist(){
        createAt = new Date();
    }
}
