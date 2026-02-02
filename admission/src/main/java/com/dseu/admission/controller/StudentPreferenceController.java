package com.dseu.admission.controller;

import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.service.StudentPreferenceService;
import com.dseu.admission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/preferences")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentPreferenceController {

    private final StudentPreferenceService service;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestHeader("Authorization") String auth,
            @RequestBody List<StudentPreference> prefs) {

        String studentId = jwtUtil.extractEmail(auth.substring(7));
        service.savePreferences(studentId, prefs);
        return ResponseEntity.ok("Preferences saved");
    }

    @PostMapping("/lock")
    public ResponseEntity<?> lock(
            @RequestHeader("Authorization") String auth) {

        String studentId = jwtUtil.extractEmail(auth.substring(7));
        service.lockPreferences(studentId);
        return ResponseEntity.ok("Preferences locked");
    }
}


