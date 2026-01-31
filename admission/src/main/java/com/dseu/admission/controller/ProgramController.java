package com.dseu.admission.controller;

import com.dseu.admission.entity.Program;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService service;

    @PostMapping
    public Program create(@RequestBody Map<String, Object> req) {
        return service.create(
                req.get("programName").toString(),
                Long.valueOf(req.get("programLevelId").toString())
        );
    }

    @GetMapping
    public List<Program> byLevel(@RequestParam String level) {
        return service.getByLevel(level);
    }
}
