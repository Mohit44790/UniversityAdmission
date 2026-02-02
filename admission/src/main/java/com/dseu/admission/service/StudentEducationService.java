package com.dseu.admission.service;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.repository.StudentEducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentEducationService {

    private final StudentEducationRepository repo;

    public void save(String studentId, StudentEducation edu) {
        edu.setStudentId(studentId);
        repo.save(edu);
    }

    public StudentEducation get(String studentId) {
        return repo.findById(studentId).orElseThrow();
    }
}

