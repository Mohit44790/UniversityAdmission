package com.dseu.admission.controller;

import com.dseu.admission.entity.College;
import com.dseu.admission.service.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/colleges")
@RequiredArgsConstructor
public class CollegeController {

    private final CollegeService service;

    @PostMapping
    public College create(@RequestBody College college) {
        return service.create(college);
    }

    @GetMapping
    public List<College> getAll() {
        return service.getAll();
    }
}

