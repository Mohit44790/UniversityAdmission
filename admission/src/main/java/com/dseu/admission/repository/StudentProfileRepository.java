package com.dseu.admission.repository;

import com.dseu.admission.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, String> {
}
