package com.dseu.admission.repository;

import com.dseu.admission.entity.StudentPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentPreferenceRepository
        extends JpaRepository<StudentPreference, Long> {

    List<StudentPreference> findByStudentId(String studentId);
    void deleteByStudentId(String studentId);
}
