package com.proyecto.serverjava.security.filters;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.serverjava.entities.dtos.BoomDto;
import com.proyecto.serverjava.entities.dtos.UserLoginDto;
import com.proyecto.serverjava.entities.dtos.ResponsesDtos.LoginResponseDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static com.proyecto.serverjava.security.utilities.JWTProperties.*;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = null;
        String password = null;
        try {
            UserLoginDto userLogin = new ObjectMapper().readValue(request.getInputStream(), UserLoginDto.class);
            username = userLogin.getUsername();
            password = userLogin.getPassword();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        var authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
            
        User user =  (User) authResult.getPrincipal();
        String username = user.getUsername();
        Collection<? extends GrantedAuthority> roles =  user.getAuthorities();

        String authorities = new ObjectMapper().writeValueAsString(roles);
        
        Claims claims = Jwts.claims()
        .add("authorities", authorities)
        .add("username", username).build();
        
       String token = Jwts.builder()
        .subject(username)
        .claims(claims)
        .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
        .issuedAt(new Date())
        .signWith(secretKey)
        .compact();
                

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken(token);
        loginResponseDto.setUsername(username);
        response.setContentType(applicationjson);
        response.setHeader(header_authorization, bearer+token);
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponseDto));
        
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

        int status = HttpStatus.BAD_REQUEST.value();
        BoomDto boomDto = new BoomDto(status, failed.getMessage(), "Usuario o contraseña incorrectos");

        response.setContentType(applicationjson);
        response.setStatus(status);
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(boomDto));
    }

}
