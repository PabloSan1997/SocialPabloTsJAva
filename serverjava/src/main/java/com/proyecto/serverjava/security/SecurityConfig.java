package com.proyecto.serverjava.security;

import java.util.Arrays;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.proyecto.serverjava.security.filters.JwtAuthenticationFilter;
import com.proyecto.serverjava.security.filters.JwtValidationFilter;

@Configuration
public class SecurityConfig {
    
    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager getAuthenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.POST, "/api/user/register").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/user/perfil","/api/user/perfil/{userFriend}", "/api/image").hasRole("USER")
        .requestMatchers(HttpMethod.DELETE, "/api/user", "api/image/{id}", "/api/coment/{id}").hasRole("USER")
        .requestMatchers(HttpMethod.POST, "/api/image/addImage",  "/api/coment/{id}", "/api/coment/{id}").hasRole("USER")
        .anyRequest().authenticated()).csrf(c -> c.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .addFilter(new JwtAuthenticationFilter(getAuthenticationManager()))
        .addFilter(new JwtValidationFilter(getAuthenticationManager()))
        .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PATCH", "PUT"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;

    }


}
