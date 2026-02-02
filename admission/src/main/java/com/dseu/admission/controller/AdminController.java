package com.dseu.admission.controller;

import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.repository.StudentPreferenceRepository;
import com.dseu.admission.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final StudentProfileRepository studentProfileRepository;
    private final StudentPreferenceRepository studentPreferenceRepository;

    // ✅ 1️⃣ Get all submitted (locked) applications
    @GetMapping("/applications")
    public ResponseEntity<List<StudentProfile>> getAllSubmittedApplications() {

        List<StudentProfile> applications = studentProfileRepository.findAll()
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getProfileLocked()))
                .toList();

        return ResponseEntity.ok(applications);
    }

    // ✅ 2️⃣ Approve / Reject application
    @PutMapping("/application/{userId}")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable String userId,
            @RequestBody Map<String, String> payload) {

        StudentProfile profile = studentProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        profile.setApplicationStatus(payload.get("status"));   // ✅ FIXED
        profile.setAdminRemarks(payload.get("remarks"));       // ✅ FIXED

        studentProfileRepository.save(profile);
        return ResponseEntity.ok("Application updated successfully");
    }

    // ✅ 3️⃣ Get all student preferences (for allotment)
    @GetMapping("/preferences")
    public ResponseEntity<List<StudentPreference>> getAllPreferences() {
        return ResponseEntity.ok(studentPreferenceRepository.findAll());
    }
}
