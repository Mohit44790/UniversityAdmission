package com.dseu.admission.controller;

import com.dseu.admission.entity.ProgramLevel;
import com.dseu.admission.service.ProgramLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProgramLevelController {

    private final ProgramLevelService service;

    // ================= ADMIN CREATE =================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/admin/program-level")
    public ProgramLevel create(@RequestBody ProgramLevel level) {
        return service.create(level.getCode(), level.getName());
    }

    // ================= STUDENT VIEW =================
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    @GetMapping("/api/student/program-level")
    public List<ProgramLevel> getAllForStudent() {
        return service.getAll();
    }
}


