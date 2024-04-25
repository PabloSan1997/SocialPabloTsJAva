package com.proyecto.serverjava.security.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.serverjava.entities.dtos.BoomDto;
import com.proyecto.serverjava.security.utilities.GratedAuthorityJson;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import static com.proyecto.serverjava.security.utilities.JWTProperties.*;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader(header_authorization);
        if (header == null || !header.startsWith(bearer)) {
           chain.doFilter(request, response);
            return;
        }

        String token = header.replace(bearer, "");
       
        try {
            Claims claims = Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
            
            String username = claims.getSubject();

            Object userClaim = claims.get("authorities");

            Collection<? extends GrantedAuthority> authorities = Arrays.asList(
                new ObjectMapper()
                .addMixIn(SimpleGrantedAuthority.class, GratedAuthorityJson.class)
                .readValue(userClaim.toString().getBytes(), SimpleGrantedAuthority[].class)
            );

            request.setAttribute("username", username);
            var authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (Exception e) {
           generetedError(request, response, e.getMessage());
        }
    }

    private void generetedError(HttpServletRequest request, HttpServletResponse response, String e) throws JsonProcessingException, IOException{
        int status = HttpStatus.BAD_REQUEST.value();
            BoomDto boomDto = new BoomDto(status, e,  "No tienes permizo para esto");
            response.setContentType(applicationjson);
            response.setStatus(status);
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(boomDto));    
    }   

}
