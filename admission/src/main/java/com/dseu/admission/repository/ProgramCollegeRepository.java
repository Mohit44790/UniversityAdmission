package com.dseu.admission.repository;

import com.dseu.admission.entity.ProgramCollege;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramCollegeRepository extends JpaRepository<ProgramCollege,Long> {
    List<ProgramCollege> findByProgram_ProgramLevel_Code(String code);
}
