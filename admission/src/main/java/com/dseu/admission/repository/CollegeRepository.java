package com.dseu.admission.repository;

import com.dseu.admission.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeRepository
        extends JpaRepository<College, Long> {
}
