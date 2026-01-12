package com.dseu.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class StudentProfile {

    @Id
    private String userId;

    // Basic
    private String fullName;
    private LocalDate dateOfBirth;
    private Integer ageAsOnJuly1_2024;
    private String gender;
    private String category;
    private String religion;
    private String nationality;

    // Contact
    private String alternateEmail;
    private String alternateMobile;
    private String permanentAddress;
    private String correspondenceAddress;

    // University
    private Boolean enrolledBefore;
    private String enrollmentNumber;
    private String programmeRegistered;
    private Integer yearOfRegistration;

    // Family
    private String motherName;
    private String motherMobile;
    private String fatherName;
    private String fatherMobile;
    private String emergencyContact;
    private Double familyIncome;

    // Bank
    private String accountHolderName;
    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private String branchName;

    // Other
    private Boolean pwbd;
    private Boolean kashmiriMigrant;
    private Boolean pmss;
    private Boolean defenceWard;
    private Boolean hasDefenceCertificate;
    private Boolean medicalCondition;
    private String abcId;
    private Boolean universityEmployeeWard;

    // Uploads
    private String photoPath;
    private String signaturePath;
    private String abcDocumentPath;
}
