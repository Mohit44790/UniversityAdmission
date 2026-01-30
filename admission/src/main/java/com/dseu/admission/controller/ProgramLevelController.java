package com.dseu.admission.controller;

import com.dseu.admission.entity.ProgramLevel;
import com.dseu.admission.service.ProgramLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/program-level")
@RequiredArgsConstructor
public class ProgramLevelController {

    private final ProgramLevelService service;

    @PostMapping
    public ProgramLevel create(@RequestBody ProgramLevel level) {
        return service.create(level.getCode(), level.getName());
    }

    @GetMapping
    public List<ProgramLevel> getAll() {
        return service.getAll();
    }
}
