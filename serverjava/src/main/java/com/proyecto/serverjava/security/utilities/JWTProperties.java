package com.proyecto.serverjava.security.utilities;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public class JWTProperties {
    public static final SecretKey secretKey = Jwts.SIG.HS256.key().build();
    public static final String header_authorization = "Authorization";
    public static final String bearer = "Bearer ";
    public static final String applicationjson = "application/json";
}
