package com.dseu.admission.dto;

import lombok.Data;

@Data
public class OtherDetailsRequest {
    private Boolean pwbd;
    private Boolean kashmiriMigrant;
    private Boolean pmss;
    private Boolean defenceWard;
    private Boolean hasDefenceCertificate;
    private Boolean medicalCondition;
    private String abcId;
    private Boolean universityEmployeeWard;
}

