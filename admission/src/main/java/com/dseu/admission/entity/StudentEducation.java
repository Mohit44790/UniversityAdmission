package com.dseu.admission.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class StudentEducation {

    @Id
    private String studentId;

    // education eligibility flags
    private Boolean passed8 = false;
    private Boolean passed10 = false;
    private Boolean passed12 = false;
    private Boolean iti = false;
    private Boolean ug = false;

    // ⭐ education type selected by student
    // AFTER_8 / AFTER_10 / AFTER_12 / UG / PG
    private String educationType;

    // qualification form
    private String resultStatus;
    private Integer yearOfPassing;
    private Double percentage;
    private String division;
    private String institution;
    private String board;
    private String subjects;

    // subject marks table
    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentSubjectMarks> subjectMarks;
}
