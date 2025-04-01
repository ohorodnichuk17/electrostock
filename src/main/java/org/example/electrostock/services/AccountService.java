package org.example.electrostock.services;

import lombok.RequiredArgsConstructor;
import org.example.electrostock.configuration.security.JwtService;
import org.example.electrostock.repositories.RoleRepository;
import org.example.electrostock.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
}
