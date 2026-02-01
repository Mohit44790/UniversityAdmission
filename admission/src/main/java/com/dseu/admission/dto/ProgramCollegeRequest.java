package com.dseu.admission.dto;

import lombok.Data;

@Data
public class ProgramCollegeRequest {

    private Long programId;
    private Long collegeId;
    private Integer seats;
    private Integer minRank;
}
