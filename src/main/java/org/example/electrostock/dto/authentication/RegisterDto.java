package org.example.electrostock.dto.authentication;

import lombok.Data;

@Data
public class RegisterDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;
}
