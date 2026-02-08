package com.dseu.admission.controller;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.service.StudentEducationService;
import com.dseu.admission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/education")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentEducationController {

    private final StudentEducationService service;
    private final JwtUtil jwtUtil;

    private String getUserId(String auth) {
        return jwtUtil.extractEmail(auth.substring(7));
    }

    // ===============================
    // SAVE EDUCATION
    // ===============================
    @PostMapping
    public ResponseEntity<?> saveEducation(
            @RequestHeader("Authorization") String auth,
            @RequestParam String programLevel,
            @RequestBody StudentEducation edu) {

        service.save(getUserId(auth), edu, programLevel);
        return ResponseEntity.ok("Education saved");
    }

    // ===============================
    // GET EDUCATION
    // ===============================
    @GetMapping
    public StudentEducation getEducation(
            @RequestHeader("Authorization") String auth) {

        return service.get(getUserId(auth));
    }

    // ===============================
    // DELETE EDUCATION
    // ===============================
    @DeleteMapping
    public ResponseEntity<?> deleteEducation(
            @RequestHeader("Authorization") String auth) {

        service.delete(getUserId(auth));
        return ResponseEntity.ok("Education deleted");
    }
}

