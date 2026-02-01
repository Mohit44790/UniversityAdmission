package com.dseu.admission.repository;

import com.dseu.admission.entity.ProgramLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgramLevelRepository
        extends JpaRepository<ProgramLevel, Long> {

    Optional<ProgramLevel> findByCode(String code);
}
