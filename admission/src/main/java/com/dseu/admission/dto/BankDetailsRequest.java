package com.dseu.admission.dto;

import lombok.Data;

@Data
public class BankDetailsRequest {
    private String accountHolderName;
    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private String branchName;
}

