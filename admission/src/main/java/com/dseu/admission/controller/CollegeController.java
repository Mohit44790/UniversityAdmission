package com.dseu.admission.controller;

import com.dseu.admission.entity.College;
import com.dseu.admission.service.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/college")
@RequiredArgsConstructor
public class CollegeController {

    private final CollegeService service;

    // ===============================
    // CREATE COLLEGE (ADMIN ONLY)
    // ===============================
    @PostMapping
    public ResponseEntity<?> createCollege(@RequestBody College college) {

        College saved = service.createCollege(college);
        return ResponseEntity.ok(saved);
    }
}
