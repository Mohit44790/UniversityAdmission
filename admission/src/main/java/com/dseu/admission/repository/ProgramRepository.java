package com.dseu.admission.repository;

import com.dseu.admission.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramRepository extends JpaRepository<Program,Long> {
    List<Program> findByProgramLevel_Code(String code);

}
