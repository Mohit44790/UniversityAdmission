package com.dseu.admission.controller;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.entity.StudentSubjectMarks;
import com.dseu.admission.service.StudentEducationService;
import com.dseu.admission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    // STEP 1 – SELECT EDUCATION TYPE
    // ===============================
    @PostMapping("/select")
    public ResponseEntity<?> selectEducation(
            @RequestHeader("Authorization") String auth,
            @RequestParam String type) {

        service.selectEducationType(getUserId(auth), type);
        return ResponseEntity.ok("Education type saved");
    }

    // ===============================
    // STEP 2 – SAVE ELIGIBILITY FLAGS
    // ===============================
    @PostMapping("/eligibility")
    public ResponseEntity<?> saveEducation(
            @RequestHeader("Authorization") String auth,
            @RequestParam String programLevel,
            @RequestBody StudentEducation edu) {

        service.save(getUserId(auth), edu, programLevel);
        return ResponseEntity.ok("Education eligibility saved");
    }

    // ===============================
    // STEP 3 – SAVE QUALIFICATION FORM
    // ===============================
    @PostMapping("/qualification")
    public ResponseEntity<?> saveQualification(
            @RequestHeader("Authorization") String auth,
            @RequestBody StudentEducation edu) {

        service.saveQualification(getUserId(auth), edu);
        return ResponseEntity.ok("Qualification saved");
    }

    // ===============================
    // STEP 4 – SAVE SUBJECT MARKS
    // ===============================
    @PostMapping("/marks")
    public ResponseEntity<?> saveMarks(
            @RequestHeader("Authorization") String auth,
            @RequestBody List<StudentSubjectMarks> marks) {

        service.saveSubjectMarks(getUserId(auth), marks);
        return ResponseEntity.ok("Marks saved");
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
    // DELETE
    // ===============================
    @DeleteMapping
    public ResponseEntity<?> deleteEducation(
            @RequestHeader("Authorization") String auth) {

        service.delete(getUserId(auth));
        return ResponseEntity.ok("Education deleted");
    }

    // ===============================
    // GET ALLOWED PROGRAM LEVELS
    // ===============================
    @GetMapping("/allowed-program-levels")
    public List<String> getLevels(@RequestHeader("Authorization") String auth) {
        return service.getAllowedProgramLevels(getUserId(auth));
    }
}
