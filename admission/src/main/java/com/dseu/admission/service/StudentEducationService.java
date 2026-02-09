package com.dseu.admission.service;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.entity.StudentSubjectMarks;
import com.dseu.admission.repository.StudentEducationRepository;
import com.dseu.admission.repository.StudentSubjectMarksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentEducationService {

    private final StudentEducationRepository repo;
    private final StudentSubjectMarksRepository marksRepo;

    // ==========================
    // STEP 1 – SAVE ELIGIBILITY
    // ==========================
    public StudentEducation save(String studentId, StudentEducation edu, String programLevel) {

        validateEducation(programLevel, edu);

        StudentEducation existing =
                repo.findById(studentId).orElse(new StudentEducation());

        existing.setStudentId(studentId);
        existing.setPassed8(Boolean.TRUE.equals(edu.getPassed8()));
        existing.setPassed10(Boolean.TRUE.equals(edu.getPassed10()));
        existing.setPassed12(Boolean.TRUE.equals(edu.getPassed12()));
        existing.setIti(Boolean.TRUE.equals(edu.getIti()));
        existing.setUg(Boolean.TRUE.equals(edu.getUg()));

        return repo.save(existing);
    }

    // ==========================
    // GET
    // ==========================
    public StudentEducation get(String studentId) {
        return repo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Education not found"));
    }

    // ==========================
    // DELETE
    // ==========================
    public void delete(String studentId) {
        repo.deleteById(studentId);
    }

    // ==========================
    // EDUCATION TYPE SELECT
    // ==========================
    public void selectEducationType(String studentId, String type) {

        StudentEducation edu =
                repo.findById(studentId).orElse(new StudentEducation());

        edu.setStudentId(studentId);
        edu.setEducationType(type);

        repo.save(edu);
    }

    // ==========================
    // ALLOWED PROGRAM LEVELS
    // ==========================
    public List<String> getAllowedProgramLevels(String studentId) {

        StudentEducation edu = repo.findById(studentId).orElseThrow();

        return switch (edu.getEducationType()) {
            case "AFTER_8", "AFTER_10" -> List.of("DIPLOMA");
            case "AFTER_12" -> List.of("DIPLOMA", "BTECH");
            case "UG" -> List.of("PG");
            case "PG" -> List.of("PHD");
            default -> throw new RuntimeException("Invalid education");
        };
    }

    // ==========================
    // QUALIFICATION SAVE
    // ==========================
    public void saveQualification(String userId, StudentEducation edu) {

        StudentEducation existing =
                repo.findById(userId).orElse(new StudentEducation());

        existing.setStudentId(userId);

        existing.setResultStatus(edu.getResultStatus());
        existing.setYearOfPassing(edu.getYearOfPassing());
        existing.setPercentage(edu.getPercentage());
        existing.setDivision(edu.getDivision());
        existing.setInstitution(edu.getInstitution());
        existing.setBoard(edu.getBoard());
        existing.setSubjects(edu.getSubjects());

        repo.save(existing);
    }

    // ==========================
    // SUBJECT MARKS SAVE
    // ==========================
    public void saveSubjectMarks(String userId,
                                 List<StudentSubjectMarks> marksList) {

        StudentEducation education =
                repo.findById(userId)
                        .orElseThrow(() -> new RuntimeException("Education not found"));

        // ❌ DON'T TOUCH LAZY COLLECTION
        // education.getSubjectMarks()

        // ✅ delete via query
        marksRepo.deleteByEducation_StudentId(userId);

        // assign new
        for (StudentSubjectMarks mark : marksList) {
            mark.setEducation(education);
        }

        marksRepo.saveAll(marksList);
    }


    // ==========================
    // VALIDATION
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

            case "AFTER_12", "UG" -> {
                if (!Boolean.TRUE.equals(edu.getPassed10()) ||
                        !Boolean.TRUE.equals(edu.getPassed12()))
                    throw new RuntimeException("10th and 12th required");
            }

            case "PG" -> {
                if (!Boolean.TRUE.equals(edu.getUg()))
                    throw new RuntimeException("UG required");
            }

            default -> throw new RuntimeException("Invalid program level");
        }
    }
}
