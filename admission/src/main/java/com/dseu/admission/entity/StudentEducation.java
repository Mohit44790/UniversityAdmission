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

    private Boolean passed8;
    private Boolean passed10;
    private Boolean passed12;
    private Boolean iti;
    private Boolean ug;
}

