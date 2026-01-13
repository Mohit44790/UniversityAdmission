package com.dseu.admission.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BasicDetailsRequest {
    private String fullName;
    private LocalDate dateOfBirth;
    private Integer ageAsOnJuly1_2024;
    private String gender;
    private String category;
    private String religion;
    private String nationality;

    private String alternateEmail;
    private String alternateMobile;
    private String permanentAddress;
    private String correspondenceAddress;

    private Boolean enrolledBefore;
    private String enrollmentNumber;
    private String programmeRegistered;
    private Integer yearOfRegistration;
}

