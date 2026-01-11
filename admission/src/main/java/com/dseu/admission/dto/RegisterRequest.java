package com.dseu.admission.dto;


import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String mobile;
    private String password;
    private String confirmPassword;
}
