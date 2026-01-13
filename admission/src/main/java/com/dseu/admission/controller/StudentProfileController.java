package com.dseu.admission.controller;

import com.dseu.admission.dto.*;
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

    private String getUserId(String auth) {
        return jwtUtil.extractEmail(auth.substring(7));
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    // ===============================


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

    // ================= GET FULL PROFILE =================
    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> getProfile(
            @RequestHeader("Authorization") String auth) {

        return ResponseEntity.ok(service.getProfile(getUserId(auth)));
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
