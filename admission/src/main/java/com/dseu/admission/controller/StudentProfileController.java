package com.dseu.admission.controller;

import com.dseu.admission.dto.*;
import com.dseu.admission.service.StudentProfileService;
import com.dseu.admission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentProfileController {

    private final StudentProfileService service;
    private final JwtUtil jwtUtil;

    private String getUserId(String auth) {
        return jwtUtil.extractEmail(auth.substring(7));
    }

    // ================= BASIC =================
    @PostMapping("/profile/basic")
    public ResponseEntity<?> saveBasic(
            @RequestHeader("Authorization") String auth,
            @RequestBody BasicDetailsRequest req) {

        service.saveBasic(getUserId(auth), req);
        return ResponseEntity.ok(Map.of("message", "Basic details saved"));
    }

    // ================= FAMILY =================
    @PostMapping("/profile/family")
    public ResponseEntity<?> saveFamily(
            @RequestHeader("Authorization") String auth,
            @RequestBody FamilyDetailsRequest req) {

        service.saveFamily(getUserId(auth), req);
        return ResponseEntity.ok(Map.of("message", "Family details saved"));
    }

    // ================= BANK =================
    @PostMapping("/profile/bank")
    public ResponseEntity<?> saveBank(
            @RequestHeader("Authorization") String auth,
            @RequestBody BankDetailsRequest req) {

        service.saveBank(getUserId(auth), req);
        return ResponseEntity.ok(Map.of("message", "Bank details saved"));
    }

    // ================= OTHER =================
    @PostMapping("/profile/other")
    public ResponseEntity<?> saveOther(
            @RequestHeader("Authorization") String auth,
            @RequestBody OtherDetailsRequest req) {

        service.saveOther(getUserId(auth), req);
        return ResponseEntity.ok(Map.of("message", "Other details saved"));
    }

    // 🔥 MAIN PROFILE API
    @GetMapping("/profile")
    public ResponseEntity<?> getFullProfile(
            @RequestHeader("Authorization") String auth) {

        return ResponseEntity.ok(
                service.getFullProfile(getUserId(auth))
        );
    }



    // ================= PROGRAM LEVEL =================
    @PostMapping("/program-level")
    public ResponseEntity<?> selectProgramLevel(
            @RequestHeader("Authorization") String auth,
            @RequestBody Map<String, String> req) {

        service.selectProgramLevel(getUserId(auth), req.get("programLevel"));
        return ResponseEntity.ok("Program level selected");
    }

    // ================= FINAL SUBMIT =================
    @PostMapping("/final-submit")
    public ResponseEntity<?> finalSubmit(
            @RequestHeader("Authorization") String auth) {

        service.finalSubmit(getUserId(auth));
        return ResponseEntity.ok("Profile submitted & locked");
    }
}
