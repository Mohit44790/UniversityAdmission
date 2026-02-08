package com.dseu.admission.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StudentSubjectMarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private Double totalMarks;
    private Double obtainedMarks;

    @ManyToOne
    @JoinColumn(name = "education_id")
    private StudentEducation education;
}
