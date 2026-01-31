package com.dseu.admission.controller;

import com.dseu.admission.entity.ProgramCollege;
import com.dseu.admission.service.ProgramCollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/program-colleges")
@RequiredArgsConstructor
public class ProgramCollegeController {

    private final ProgramCollegeService service;

    @PostMapping
    public ProgramCollege create(@RequestBody Map<String, Integer> req) {
        return service.create(
                req.get("programId"),
                req.get("collegeId"),
                req.get("seats"),
                req.get("minRank")
        );
    }

    @GetMapping
    public List<ProgramCollege> byLevel(@RequestParam String level) {
        return service.getByLevel(level);
    }
}
