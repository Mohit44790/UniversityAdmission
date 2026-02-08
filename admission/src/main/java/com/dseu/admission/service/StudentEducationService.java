package com.dseu.admission.service;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.repository.StudentEducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentEducationService {

    private final StudentEducationRepository repo;

    // CREATE / UPDATE
    public StudentEducation save(String studentId, StudentEducation edu, String programLevel) {

        validateEducation(programLevel, edu);

        edu.setStudentId(studentId);
        return repo.save(edu);
    }

    // GET
    public StudentEducation get(String studentId) {
        return repo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Education not found"));
    }

    // DELETE
    public void delete(String studentId) {
        repo.deleteById(studentId);
    }

    // ==========================
    // VALIDATION LOGIC
    // ==========================
    private void validateEducation(String level, StudentEducation edu) {

        switch (level) {

            case "AFTER_8" -> {
                if (!Boolean.TRUE.equals(edu.getPassed8()))
                    throw new RuntimeException("8th pass required");
            }

            case "AFTER_10" -> {
                if (!Boolean.TRUE.equals(edu.getPassed10()) &&
                        !Boolean.TRUE.equals(edu.getIti()))
                    throw new RuntimeException("10th or ITI required");
            }

            case "AFTER_12" -> {
                if (!Boolean.TRUE.equals(edu.getPassed10()) ||
                        !Boolean.TRUE.equals(edu.getPassed12()))
                    throw new RuntimeException("10th and 12th required");
            }

            case "UG" -> {
                if (!Boolean.TRUE.equals(edu.getPassed10()) ||
                        !Boolean.TRUE.equals(edu.getPassed12()))
                    throw new RuntimeException("10th + 12th required");
            }

            case "PG" -> {
                if (!Boolean.TRUE.equals(edu.getUg()))
                    throw new RuntimeException("UG required");
            }

            default -> throw new RuntimeException("Invalid program level");
        }
    }
}


