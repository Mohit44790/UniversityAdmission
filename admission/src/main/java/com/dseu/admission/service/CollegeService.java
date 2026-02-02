package com.dseu.admission.service;

import com.dseu.admission.entity.College;
import com.dseu.admission.repository.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollegeService {

    private final CollegeRepository repository;

    public College createCollege(College college) {

        if (repository.existsByCollegeName(college.getCollegeName())) {
            throw new RuntimeException("College already exists");
        }

        return repository.save(college);
    }
}
