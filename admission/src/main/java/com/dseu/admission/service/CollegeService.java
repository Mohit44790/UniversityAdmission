package com.dseu.admission.service;

import com.dseu.admission.entity.College;
import com.dseu.admission.repository.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollegeService {

    private final CollegeRepository repository;

    public College create(College college) {
        return repository.save(college);
    }

    public List<College> getAll() {
        return repository.findAll();
    }
}

