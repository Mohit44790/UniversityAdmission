package com.dseu.admission.service;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.repository.StudentEducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EligibilityService {

    private final StudentEducationRepository eduRepo;

    public List<String> getEligibleProgramLevels(String studentId) {

        StudentEducation edu = eduRepo.findById(studentId).orElseThrow();
        List<String> levels = new ArrayList<>();

        if (Boolean.TRUE.equals(edu.getPassed8())) {
            levels.add("AFTER_8");
        }
        if (Boolean.TRUE.equals(edu.getPassed10()) || Boolean.TRUE.equals(edu.getIti())) {
            levels.add("AFTER_10");
        }
        if (Boolean.TRUE.equals(edu.getPassed12())) {
            levels.add("AFTER_12");
        }
        if (Boolean.TRUE.equals(edu.getUg())) {
            levels.add("UG");
        }

        return levels;
    }
}

