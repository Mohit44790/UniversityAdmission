package com.dseu.admission.service;

import com.dseu.admission.entity.ProgramLevel;
import com.dseu.admission.repository.ProgramLevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramLevelService {

    private final ProgramLevelRepository repository;

    public ProgramLevel create(String code, String name) {
        ProgramLevel level = new ProgramLevel();
        level.setCode(code);
        level.setName(name);
        return repository.save(level);
    }

    public List<ProgramLevel> getAll() {
        return repository.findAll();
    }
}

