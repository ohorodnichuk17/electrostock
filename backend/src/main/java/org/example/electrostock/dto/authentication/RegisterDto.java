package org.example.electrostock.dto.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Email(message = "Invalid email format")
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String confirmPassword;
}
