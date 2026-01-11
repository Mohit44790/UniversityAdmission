//package com.dseu.admission.controller;
//
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//
//public class StudentProfileController {
//
//    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> uploadFiles(
//            @RequestParam MultipartFile photo,
//            @RequestParam MultipartFile signature,
//            @RequestParam MultipartFile abcFile) throws IOException {
//
//        Files.createDirectories(Paths.get(uploadDir));
//
//        photo.transferTo(new File(uploadDir + "/photo_" + photo.getOriginalFilename()));
//        signature.transferTo(new File(uploadDir + "/sign_" + signature.getOriginalFilename()));
//        abcFile.transferTo(new File(uploadDir + "/abc_" + abcFile.getOriginalFilename()));
//
//        return ResponseEntity.ok("Files uploaded successfully");
//    }
//
//}
