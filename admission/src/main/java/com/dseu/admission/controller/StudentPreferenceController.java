package com.dseu.admission.controller;

import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.service.StudentPreferenceService;
import com.dseu.admission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/preferences")
@RequiredArgsConstructor
public class StudentPreferenceController {

    private final StudentPreferenceService service;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestHeader("Authorization") String auth,
            @RequestBody List<StudentPreference> prefs) {

        service.savePreferences(jwtUtil.extractEmail(auth.substring(7)), prefs);
        return ResponseEntity.ok("Preferences saved");
    }

    @PostMapping("/lock")
    public ResponseEntity<?> lock(@RequestHeader("Authorization") String auth) {
        service.lock(jwtUtil.extractEmail(auth.substring(7)));
        return ResponseEntity.ok("Preferences locked");
    }
}
