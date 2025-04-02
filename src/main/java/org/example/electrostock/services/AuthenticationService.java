package org.example.electrostock.services;

import lombok.RequiredArgsConstructor;
import org.example.electrostock.configuration.security.JwtService;
import org.example.electrostock.constants.Roles;
import org.example.electrostock.dto.authentication.AuthResponseDto;
import org.example.electrostock.dto.authentication.LoginDto;
import org.example.electrostock.dto.authentication.RegisterDto;
import org.example.electrostock.entities.RoleEntity;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.UserRoleEntity;
import org.example.electrostock.repositories.RoleRepository;
import org.example.electrostock.repositories.UserRepository;
import org.example.electrostock.repositories.UserRoleRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponseDto login(LoginDto request) {
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var isValid = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!isValid) {
            throw new UsernameNotFoundException("User not found");
        }

        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder().token(jwtToken).build();
    }

    public UserEntity register(RegisterDto dto) throws Exception {
        if(!dto.getPassword().equals(dto.getConfirmPassword())) throw new Exception("Not identical passwords");

        UserEntity newUser = UserEntity.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        userRepository.save(newUser);

        RoleEntity role = roleRepository.findByName(Roles.User);

        var ur = UserRoleEntity
                .builder()
                .role(role)
                .user(newUser)
                .build();

        userRoleRepository.save(ur);

        return newUser;
    }
}
