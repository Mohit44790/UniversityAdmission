package com.dseu.admission.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String programName;     // Diploma Engineering, B.Tech

    @ManyToOne
    private ProgramLevel programLevel;
}
