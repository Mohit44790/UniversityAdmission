package com.dseu.admission.controller;

import com.dseu.admission.dto.ProgramCollegeRequest;
import com.dseu.admission.entity.ProgramCollege;
import com.dseu.admission.service.ProgramCollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProgramCollegeController {

    private final ProgramCollegeService service;

    // =========================================================
    // ADMIN → CREATE PROGRAM + COLLEGE SEAT MAPPING
    // =========================================================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/admin/program-colleges")
    public ProgramCollege create(@RequestBody ProgramCollegeRequest req) {

        return service.create(
                req.getProgramId(),
                req.getCollegeId(),
                req.getSeats(),
                req.getMinRank()
        );
    }

    // =========================================================
    // ADMIN → VIEW ALL BY LEVEL
    // =========================================================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/admin/program-colleges")
    public List<ProgramCollege> getByLevelAdmin(@RequestParam String level) {
        return service.getByLevel(level);
    }

    // =========================================================
    // STUDENT → VIEW AVAILABLE PROGRAMS AFTER SELECTING LEVEL
    // =========================================================
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/api/student/program-colleges")
    public List<ProgramCollege> getByLevelStudent(@RequestParam String level) {
        return service.getByLevel(level);
    }
}
