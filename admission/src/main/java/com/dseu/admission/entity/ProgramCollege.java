package com.dseu.admission.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProgramCollege {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Program program;

    @ManyToOne
    private College college;

    private Integer totalSeats;
    private Integer availableSeats;
    private Integer minRank;   // eligibility
}

