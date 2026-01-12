package com.dseu.admission.service;

import com.dseu.admission.dto.StudentProfileRequest;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository repository;

    public void saveOrUpdateProfile(String userId, StudentProfileRequest req) {

        StudentProfile profile =
                repository.findById(userId).orElse(new StudentProfile());

        profile.setUserId(userId);

        // Basic
        profile.setFullName(req.getFullName());
        profile.setDateOfBirth(req.getDateOfBirth());
        profile.setAgeAsOnJuly1_2024(req.getAgeAsOnJuly1_2024());
        profile.setGender(req.getGender());
        profile.setCategory(req.getCategory());
        profile.setReligion(req.getReligion());
        profile.setNationality(req.getNationality());

        // Contact
        profile.setAlternateEmail(req.getAlternateEmail());
        profile.setAlternateMobile(req.getAlternateMobile());
        profile.setPermanentAddress(req.getPermanentAddress());
        profile.setCorrespondenceAddress(req.getCorrespondenceAddress());

        // University
        profile.setEnrolledBefore(req.getEnrolledBefore());
        profile.setEnrollmentNumber(req.getEnrollmentNumber());
        profile.setProgrammeRegistered(req.getProgrammeRegistered());
        profile.setYearOfRegistration(req.getYearOfRegistration());

        // Family
        profile.setMotherName(req.getMotherName());
        profile.setMotherMobile(req.getMotherMobile());
        profile.setFatherName(req.getFatherName());
        profile.setFatherMobile(req.getFatherMobile());
        profile.setEmergencyContact(req.getEmergencyContact());
        profile.setFamilyIncome(req.getFamilyIncome());

        // Bank
        profile.setAccountHolderName(req.getAccountHolderName());
        profile.setBankName(req.getBankName());
        profile.setAccountNumber(req.getAccountNumber());
        profile.setIfscCode(req.getIfscCode());
        profile.setBranchName(req.getBranchName());

        // Other
        profile.setPwbd(req.getPwbd());
        profile.setKashmiriMigrant(req.getKashmiriMigrant());
        profile.setPmss(req.getPmss());
        profile.setDefenceWard(req.getDefenceWard());
        profile.setHasDefenceCertificate(req.getHasDefenceCertificate());
        profile.setMedicalCondition(req.getMedicalCondition());
        profile.setAbcId(req.getAbcId());
        profile.setUniversityEmployeeWard(req.getUniversityEmployeeWard());

        repository.save(profile);
    }

    public StudentProfile getProfile(String userId) {
        return repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}
