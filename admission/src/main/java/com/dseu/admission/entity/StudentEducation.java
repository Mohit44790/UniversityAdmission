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

    private Boolean passed8 = false;
    private Boolean passed10 = false;
    private Boolean passed12 = false;
    private Boolean iti = false;
    private Boolean ug = false;
}


