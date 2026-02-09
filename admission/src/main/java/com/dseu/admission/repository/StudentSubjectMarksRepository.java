package com.dseu.admission.repository;

import com.dseu.admission.entity.StudentSubjectMarks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSubjectMarksRepository
        extends JpaRepository<StudentSubjectMarks, Long> {
    void deleteByEducation_StudentId(String studentId);
}
