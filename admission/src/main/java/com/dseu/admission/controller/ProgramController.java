package com.dseu.admission.controller;

import com.dseu.admission.entity.Program;
import com.dseu.admission.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService service;

    @PostMapping("/api/admin/programs")
    public Program create(@RequestBody Map<String, Object> req) {
        return service.create(
                req.get("programName").toString(),
                Long.valueOf(req.get("programLevelId").toString())
        );
    }
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    @GetMapping("/api/student/programs")
    public List<Program> byLevel(@RequestParam String level) {
        return service.getByLevel(level);
    }
}