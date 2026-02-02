package com.dseu.admission.repository;

import com.dseu.admission.entity.StudentEducation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentEducationRepository
        extends JpaRepository<StudentEducation, String> {
}

