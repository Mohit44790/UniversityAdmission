package com.dseu.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StudentEducation {

    @Id
    private String studentId;

    private String educationType; // AFTER_8, AFTER_10, AFTER_12, UG, PG

    // eligibility flags
    private Boolean passed8 = false;
    private Boolean passed10 = false;
    private Boolean passed12 = false;
    private Boolean iti = false;
    private Boolean ug = false;

    // detailed data
    private String boardName;
    private Integer passingYear;
    private Double percentage;
}



