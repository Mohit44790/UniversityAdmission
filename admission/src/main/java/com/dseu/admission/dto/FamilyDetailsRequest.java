package com.dseu.admission.dto;

import lombok.Data;

@Data
public class FamilyDetailsRequest {
    private String motherName;
    private String motherMobile;
    private String fatherName;
    private String fatherMobile;
    private String emergencyContact;
    private Double familyIncome;
}

