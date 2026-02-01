package com.dseu.admission.controller;

import com.dseu.admission.dto.ProgramCollegeRequest;
import com.dseu.admission.entity.ProgramCollege;
import com.dseu.admission.service.ProgramCollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/program-colleges")
@RequiredArgsConstructor
public class ProgramCollegeController {

    private final ProgramCollegeService service;

    @PostMapping
    public ProgramCollege create(@RequestBody ProgramCollegeRequest req) {

        return service.create(
                req.getProgramId(),
                req.getCollegeId(),
                req.getSeats(),
                req.getMinRank()
        );
    }

    @GetMapping
    public List<ProgramCollege> byLevel(@RequestParam String level) {
        return service.getByLevel(level);
    }
}
