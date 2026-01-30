package com.dseu.admission.controller;

@RestController
@RequestMapping("/api/admin/program-level")
@RequiredArgsConstructor
public class ProgramLevelController {

    private final ProgramLevelService service;

    @PostMapping
    public ProgramLevel create(@RequestBody ProgramLevel level) {
        return service.create(level.getCode(), level.getName());
    }

    @GetMapping
    public List<ProgramLevel> getAll() {
        return service.getAll();
    }
}
