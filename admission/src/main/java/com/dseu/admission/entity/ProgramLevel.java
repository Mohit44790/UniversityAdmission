package com.dseu.admission.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProgramLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;     // AFTER_10, AFTER_12, UG

    private String name;     // Polytechnic, Undergraduate, Postgraduate
}
