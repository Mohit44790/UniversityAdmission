package com.dseu.admission.repository;

import com.dseu.admission.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, String> {
    List<StudentProfile> findByProfileLockedTrue();
}
