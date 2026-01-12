package com.dseu.admission.controller;

import com.dseu.admission.dto.StudentProfileRequest;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.service.StudentProfileService;
import com.dseu.admission.util.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService service;
    private final JwtUtil jwtUtil;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // ===============================
    // SAVE / UPDATE PROFILE
    // ===============================
    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(
            @RequestHeader("Authorization") String auth,
            @RequestBody StudentProfileRequest request) {

        String token = auth.substring(7);
        String userId = jwtUtil.extractEmail(token);

        service.saveOrUpdateProfile(userId, request);
        return ResponseEntity.ok(Map.of("message", "Profile saved successfully"));
    }

    // ===============================
    // GET PROFILE
    // ===============================
    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> getProfile(
            @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);
        String userId = jwtUtil.extractEmail(token);

        return ResponseEntity.ok(service.getProfile(userId));
    }

    // ===============================
    // FILE UPLOADS
    // ===============================
    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFiles(
            @RequestHeader("Authorization") String auth,
            @RequestParam MultipartFile photo,
            @RequestParam MultipartFile signature,
            @RequestParam MultipartFile abcFile) throws Exception {

        String token = auth.substring(7);
        String userId = jwtUtil.extractEmail(token);

        Files.createDirectories(Paths.get(uploadDir + "/" + userId));

        photo.transferTo(new File(uploadDir + "/" + userId + "/photo.jpg"));
        signature.transferTo(new File(uploadDir + "/" + userId + "/signature.jpg"));
        abcFile.transferTo(new File(uploadDir + "/" + userId + "/abc.pdf"));

        return ResponseEntity.ok(Map.of("message", "Files uploaded successfully"));
    }
}
