package com.dseu.admission.service;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.repository.StudentEducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void selectEducationType(String studentId, String type) {

        StudentEducation edu =
                repo.findById(studentId).orElse(new StudentEducation());

        edu.setStudentId(studentId);
        edu.setEducationType(type);

        repo.save(edu);
    }

    public List<String> getAllowedProgramLevels(String studentId) {

        StudentEducation edu = repo.findById(studentId).orElseThrow();

        switch (edu.getEducationType()) {

            case "AFTER_8":
            case "AFTER_10":
                return List.of("DIPLOMA");

            case "AFTER_12":
                return List.of("DIPLOMA", "BTECH");

            case "UG":
                return List.of("PG");

            case "PG":
                return List.of("PHD");

            default:
                throw new RuntimeException("Invalid education");
        }
    }

    public void saveDetails(String userId, StudentEducation edu) {

        // get existing education OR create new
        StudentEducation existing =
                repo.findById(userId).orElse(new StudentEducation());

        existing.setStudentId(userId);

        // =========================
        // update eligibility flags
        // =========================
        existing.setPassed8(Boolean.TRUE.equals(edu.getPassed8()));
        existing.setPassed10(Boolean.TRUE.equals(edu.getPassed10()));
        existing.setPassed12(Boolean.TRUE.equals(edu.getPassed12()));
        existing.setIti(Boolean.TRUE.equals(edu.getIti()));
        existing.setUg(Boolean.TRUE.equals(edu.getUg()));

        // =========================
        // update detailed fields
        // =========================
        existing.setBoardName(edu.getBoardName());
        existing.setPassingYear(edu.getPassingYear());
        existing.setPercentage(edu.getPercentage());

        // =========================
        // validation (important)
        // =========================
        if (existing.getPassingYear() != null &&
                existing.getPassingYear() > java.time.Year.now().getValue()) {
            throw new RuntimeException("Invalid passing year");
        }

        if (existing.getPercentage() != null &&
                (existing.getPercentage() < 0 || existing.getPercentage() > 100)) {
            throw new RuntimeException("Invalid percentage");
        }

        // save
        repo.save(existing);
    }

}


