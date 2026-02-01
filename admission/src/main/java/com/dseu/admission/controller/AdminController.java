package com.dseu.admission.controller;

import com.dseu.admission.entity.*;
import com.dseu.admission.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProgramLevelService programLevelService;
    private final ProgramService programService;
    private final CollegeService collegeService;
    private final ProgramCollegeService programCollegeService;
    private final EditWindowService editWindowService;
    private final StudentPreferenceService studentPreferenceService;
    private final StudentProfileService studentProfileService;

    // ===============================
    // PROGRAM LEVEL (AFTER 10 / 12 / UG)
    // ===============================
    @PostMapping("/program-level")
    public ResponseEntity<?> createProgramLevel(@RequestBody ProgramLevel level) {
        return ResponseEntity.ok(
                programLevelService.create(level.getCode(), level.getName())
        );
    }

    @GetMapping("/program-level")
    public List<ProgramLevel> getAllProgramLevels() {
        return programLevelService.getAll();
    }

    // ===============================
    // PROGRAM (BTech, Diploma, MBA etc.)
    // ===============================
    @PostMapping("/program")
    public Program createProgram(@RequestBody Map<String, Object> req) {
        return programService.create(
                req.get("programName").toString(),
                Long.valueOf(req.get("programLevelId").toString())
        );
    }

    @GetMapping("/programs")
    public List<Program> getProgramsByLevel(@RequestParam String level) {
        return programService.getByLevel(level);
    }

    // ===============================
    // COLLEGE
    // ===============================
    @PostMapping("/college")
    public College createCollege(@RequestBody College college) {
        return collegeService.create(college);
    }

    @GetMapping("/colleges")
    public List<College> getAllColleges() {
        return collegeService.getAll();
    }

    // ===============================
    // PROGRAM + COLLEGE (SEATS & RANK)
    // ===============================
    @PostMapping("/program-college")
    public ProgramCollege createProgramCollege(@RequestBody Map<String, Object> req) {

        return programCollegeService.create(
                Long.valueOf(req.get("programId").toString()),
                Long.valueOf(req.get("collegeId").toString()),
                Integer.parseInt(req.get("seats").toString()),
                Integer.parseInt(req.get("minRank").toString())
        );
    }

    @GetMapping("/program-colleges")
    public List<ProgramCollege> getProgramCollegesByLevel(@RequestParam String level) {
        return programCollegeService.getByLevel(level);
    }

    // ===============================
    // EDIT WINDOW (UNLOCK PREFERENCES)
    // ===============================
    @PostMapping("/edit-window/open")
    public ResponseEntity<?> openEditWindow() {
        editWindowService.open();
        return ResponseEntity.ok("Edit window opened");
    }

    @PostMapping("/edit-window/close")
    public ResponseEntity<?> closeEditWindow() {
        editWindowService.close();
        return ResponseEntity.ok("Edit window closed");
    }

    // ===============================
    // VIEW LOCKED STUDENT PROFILES
    // ===============================
    @GetMapping("/submitted-students")
    public List<StudentProfile> getSubmittedStudents() {
        return studentProfileService.getSubmittedProfiles();
    }

    // ===============================
    // VIEW LOCKED PREFERENCES
    // ===============================
    @GetMapping("/locked-preferences")
    public List<StudentPreference> getLockedPreferences() {
        return studentPreferenceService.getAllLockedPreferences();
    }
}
