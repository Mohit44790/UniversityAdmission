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

    private Boolean passed8 = false;
    private Boolean passed10 = false;
    private Boolean passed12 = false;
    private Boolean iti = false;
    private Boolean ug = false;

    // qualification form
    private String resultStatus;
    private Integer yearOfPassing;
    private Double percentage;
    private String division;
    private String institution;
    private String board;
    private String subjects;

    // subject marks table
    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL)
    private List<StudentSubjectMarks> subjectMarks;
}
