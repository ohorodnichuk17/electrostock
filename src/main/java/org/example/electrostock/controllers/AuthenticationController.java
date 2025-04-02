package org.example.electrostock.controllers;

import lombok.RequiredArgsConstructor;
import org.example.electrostock.dto.authentication.AuthResponseDto;
import org.example.electrostock.dto.authentication.LoginDto;
import org.example.electrostock.dto.authentication.RegisterDto;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto dto) {
        try {
            var auth = service.login(dto);
            return ResponseEntity.ok(auth);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public ResponseEntity<UserEntity> register(@RequestBody RegisterDto dto) {
        try {
            var res = service.register(dto);
            return ResponseEntity.ok(res);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
