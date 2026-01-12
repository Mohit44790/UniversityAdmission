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

import java.nio.file.Files;
import java.nio.file.Path;
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
    // FILE UPLOADS (FIXED)
    // ===============================
    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFiles(
            @RequestHeader("Authorization") String auth,
            @RequestParam MultipartFile photo,
            @RequestParam MultipartFile signature,
            @RequestParam MultipartFile abcFile) throws Exception {

        String token = auth.substring(7);

        // 🔐 Sanitize email for folder name
        String email = jwtUtil.extractEmail(token);
        String safeUserId = email.replace("@", "_").replace(".", "_");

        // 📂 Resolve absolute upload path
        Path baseUploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path userDir = baseUploadPath.resolve(safeUserId);

        // ✅ Create directories if not exist
        Files.createDirectories(userDir);

        // 📁 File paths
        Path photoPath = userDir.resolve("photo.jpg");
        Path signPath = userDir.resolve("signature.jpg");
        Path abcPath = userDir.resolve("abc.pdf");

        // 💾 Save files
        photo.transferTo(photoPath.toFile());
        signature.transferTo(signPath.toFile());
        abcFile.transferTo(abcPath.toFile());

        // (OPTIONAL) Save paths in DB
        service.updateDocumentPaths(
                email,
                photoPath.toString(),
                signPath.toString(),
                abcPath.toString()
        );

        return ResponseEntity.ok(Map.of(
                "message", "Files uploaded successfully",
                "directory", userDir.toString()
        ));
    }
}
