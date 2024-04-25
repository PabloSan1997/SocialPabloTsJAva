package com.proyecto.serverjava.entities;

import java.util.ArrayList;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, length = 50)
    @NotBlank
    @Size(max = 50, min = 1)
    private String username;

    @Column( length = 50)
    @NotBlank
    @Size(max = 50)
    private String nickname;

    @NotBlank
    private String password;

   @OneToOne(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
   @JsonIgnoreProperties({"user"})
   private UserInfo userInfo;

   @ManyToMany()
   @JsonIgnoreProperties({"users"})
   @JoinTable(
    name = "user_role",
    joinColumns = @JoinColumn(name ="id_user"),
    inverseJoinColumns = @JoinColumn(name="id_role"),
    uniqueConstraints = {@UniqueConstraint(columnNames = {"id_user", "id_role"})}
    )
   private List<Roles> roles;


   @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
   @JsonIgnoreProperties({"users"})
   private List<Image> images;

   @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
   @JsonIgnoreProperties({"users"})
   private List<Coments> coments;
   
    public Users(){
        this.roles = new ArrayList<Roles>();
        this.images = new ArrayList<Image>();
        this.coments = new ArrayList<Coments>();
    }

    

    public void addRole(Roles roles){
        this.roles.add(roles);
    }

    public void addImage(Image image){
        this.images.add(image);
    }

    public void addComent(Coments coments){
        this.coments.add(coments);
    }
}
