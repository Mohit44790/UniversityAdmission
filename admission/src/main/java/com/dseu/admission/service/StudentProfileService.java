package com.dseu.admission.service;

import com.dseu.admission.dto.BankDetailsRequest;
import com.dseu.admission.dto.BasicDetailsRequest;
import com.dseu.admission.dto.FamilyDetailsRequest;

import com.dseu.admission.dto.OtherDetailsRequest;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository repository;

    private StudentProfile getOrCreate(String userId) {
        return repository.findById(userId)
                .orElseGet(() -> {
                    StudentProfile p = new StudentProfile();
                    p.setUserId(userId);
                    return p;
                });
    }

    public void saveBasic(String userId, BasicDetailsRequest r) {
        StudentProfile p = getOrCreate(userId);

        p.setFullName(r.getFullName());
        p.setDateOfBirth(r.getDateOfBirth());
        p.setAgeAsOnJuly1_2024(r.getAgeAsOnJuly1_2024());
        p.setGender(r.getGender());
        p.setCategory(r.getCategory());
        p.setReligion(r.getReligion());
        p.setNationality(r.getNationality());
        p.setAlternateEmail(r.getAlternateEmail());
        p.setAlternateMobile(r.getAlternateMobile());
        p.setPermanentAddress(r.getPermanentAddress());
        p.setCorrespondenceAddress(r.getCorrespondenceAddress());
        p.setEnrolledBefore(r.getEnrolledBefore());
        p.setEnrollmentNumber(r.getEnrollmentNumber());
        p.setProgrammeRegistered(r.getProgrammeRegistered());
        p.setYearOfRegistration(r.getYearOfRegistration());

        repository.save(p);
    }

    public void saveFamily(String userId, FamilyDetailsRequest r) {
        StudentProfile p = getOrCreate(userId);

        p.setMotherName(r.getMotherName());
        p.setMotherMobile(r.getMotherMobile());
        p.setFatherName(r.getFatherName());
        p.setFatherMobile(r.getFatherMobile());
        p.setEmergencyContact(r.getEmergencyContact());
        p.setFamilyIncome(r.getFamilyIncome());

        repository.save(p);
    }

    public void saveBank(String userId, BankDetailsRequest r) {
        StudentProfile p = getOrCreate(userId);

        p.setAccountHolderName(r.getAccountHolderName());
        p.setBankName(r.getBankName());
        p.setAccountNumber(r.getAccountNumber());
        p.setIfscCode(r.getIfscCode());
        p.setBranchName(r.getBranchName());

        repository.save(p);
    }

    public void saveOther(String userId, OtherDetailsRequest r) {
        StudentProfile p = getOrCreate(userId);

        p.setPwbd(r.getPwbd());
        p.setKashmiriMigrant(r.getKashmiriMigrant());
        p.setPmss(r.getPmss());
        p.setDefenceWard(r.getDefenceWard());
        p.setHasDefenceCertificate(r.getHasDefenceCertificate());
        p.setMedicalCondition(r.getMedicalCondition());
        p.setAbcId(r.getAbcId());
        p.setUniversityEmployeeWard(r.getUniversityEmployeeWard());

        repository.save(p);
    }

    public StudentProfile getProfile(String userId) {
        return repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // ✅ NEW METHOD
    public void updateDocumentPaths(
            String userId,
            String photoPath,
            String signaturePath,
            String abcPath) {

        StudentProfile profile = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setPhotoPath(photoPath);
        profile.setSignaturePath(signaturePath);
        profile.setAbcDocumentPath(abcPath);

        repository.save(profile);
    }


}
