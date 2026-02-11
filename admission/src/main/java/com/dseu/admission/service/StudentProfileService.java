package com.dseu.admission.service;

import com.dseu.admission.dto.*;
import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.repository.StudentEducationRepository;
import com.dseu.admission.repository.StudentPreferenceRepository;
import com.dseu.admission.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository repository;
    private final StudentEducationRepository educationRepository;
    private final StudentPreferenceRepository preferenceRepository;

    // ================= BASIC =================
    public void saveBasic(String userId, BasicDetailsRequest req) {

        StudentProfile profile = getOrCreate(userId);
        ensureNotLocked(profile);

        profile.setFullName(req.getFullName());
        profile.setDateOfBirth(req.getDateOfBirth());
        profile.setAgeAsOnJuly1_2024(req.getAgeAsOnJuly1_2024());
        profile.setGender(req.getGender());
        profile.setCategory(req.getCategory());
        profile.setReligion(req.getReligion());
        profile.setNationality(req.getNationality());
        profile.setPermanentAddress(req.getPermanentAddress());
        profile.setCorrespondenceAddress(req.getCorrespondenceAddress());

        repository.save(profile);
    }

    // ================= FAMILY =================
    public void saveFamily(String userId, FamilyDetailsRequest req) {

        StudentProfile profile = getOrCreate(userId);
        ensureNotLocked(profile);

        profile.setMotherName(req.getMotherName());
        profile.setMotherMobile(req.getMotherMobile());
        profile.setFatherName(req.getFatherName());
        profile.setFatherMobile(req.getFatherMobile());
        profile.setEmergencyContact(req.getEmergencyContact());
        profile.setFamilyIncome(req.getFamilyIncome());

        repository.save(profile);
    }

    // ================= BANK =================
    public void saveBank(String userId, BankDetailsRequest req) {

        StudentProfile profile = getOrCreate(userId);
        ensureNotLocked(profile);

        profile.setAccountHolderName(req.getAccountHolderName());
        profile.setBankName(req.getBankName());
        profile.setAccountNumber(req.getAccountNumber());
        profile.setIfscCode(req.getIfscCode());
        profile.setBranchName(req.getBranchName());

        repository.save(profile);
    }

    // ================= OTHER =================
    public void saveOther(String userId, OtherDetailsRequest req) {

        StudentProfile profile = getOrCreate(userId);
        ensureNotLocked(profile);

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

    // ================= PROGRAM LEVEL =================
    public void selectProgramLevel(String userId, String programLevel) {

        StudentProfile profile = getOrCreate(userId);
        ensureNotLocked(profile);

        profile.setSelectedProgramLevel(programLevel);
        repository.save(profile);
    }

    // ================= FINAL SUBMIT =================
    public void finalSubmit(String userId) {

        StudentProfile profile = getOrCreate(userId);

        if (Boolean.TRUE.equals(profile.getProfileLocked())) {
            throw new RuntimeException("Profile already submitted");
        }

        profile.setProfileLocked(true);
        profile.setLockedAt(LocalDateTime.now());
        profile.setApplicationStatus("PENDING");

        repository.save(profile);
    }

    // ================= FULL PROFILE =================
    public FullStudentProfileResponse getFullProfile(String userId) {

        StudentProfile profile = repository.findById(userId)
                .orElseGet(() -> {
                    StudentProfile p = new StudentProfile();
                    p.setUserId(userId);
                    p.setProfileLocked(false);
                    p.setPreferenceLocked(false);
                    return repository.save(p);
                });

        StudentEducation education =
                educationRepository.findById(userId).orElse(null);

        // ❌ REMOVE THIS (wrong fix)
        // education.getSubjectMarks().size();

        List<StudentPreference> preferences =
                preferenceRepository.findByStudentId(userId);

        return FullStudentProfileResponse.builder()
                .profile(profile)
                .education(education)
                .preferences(preferences)
                .selectedProgramLevel(profile.getSelectedProgramLevel())
                .profileLocked(profile.getProfileLocked())
                .build();
    }


    // ================= HELPERS =================
    private StudentProfile getOrCreate(String userId) {

        return repository.findById(userId)
                .orElseGet(() -> {
                    StudentProfile p = new StudentProfile();
                    p.setUserId(userId);
                    p.setProfileLocked(false);
                    p.setPreferenceLocked(false);
                    return repository.save(p);
                });
    }

    private void ensureNotLocked(StudentProfile profile) {
        if (Boolean.TRUE.equals(profile.getProfileLocked())) {
            throw new RuntimeException("Profile is locked. Editing not allowed.");
        }
    }

    public List<StudentProfile> getSubmittedProfiles() {
        return repository.findByProfileLockedTrue();
    }
}
