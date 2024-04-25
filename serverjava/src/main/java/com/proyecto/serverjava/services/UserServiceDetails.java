package com.proyecto.serverjava.services;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.serverjava.entities.Users;
import com.proyecto.serverjava.repositories.UsersRepository;

@Service
public class UserServiceDetails implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> opUser = usersRepository.findByUsername(username);
        if (opUser.isEmpty())
            throw new UsernameNotFoundException("");
        Users users = opUser.orElseThrow();
        Collection<? extends GrantedAuthority> authorities = users.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());

        User user = new User(
                users.getUsername(),
                users.getPassword(),
                true,
                true,
                true,
                true,
                authorities);

        return user;
    }

}
