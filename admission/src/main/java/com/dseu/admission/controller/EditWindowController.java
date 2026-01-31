package com.dseu.admission.controller;

import com.dseu.admission.service.EditWindowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/edit-window")
@RequiredArgsConstructor
public class EditWindowController {

    private final EditWindowService service;

    @PostMapping("/open")
    public ResponseEntity<?> open() {
        service.open();
        return ResponseEntity.ok("Edit window opened");
    }

    @PostMapping("/close")
    public ResponseEntity<?> close() {
        service.close();
        return ResponseEntity.ok("Edit window closed");
    }
}

