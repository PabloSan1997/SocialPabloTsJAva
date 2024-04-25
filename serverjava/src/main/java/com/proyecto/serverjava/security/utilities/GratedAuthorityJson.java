package com.proyecto.serverjava.security.utilities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class GratedAuthorityJson {
   
    @JsonCreator
    public GratedAuthorityJson (@JsonProperty("authority") String role){}
}
