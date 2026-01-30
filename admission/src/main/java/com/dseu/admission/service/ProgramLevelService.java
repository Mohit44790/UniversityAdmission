package com.dseu.admission.service;

@Service
@RequiredArgsConstructor
public class ProgramLevelService {

    private final ProgramLevelRepository repository;

    public ProgramLevel create(String code, String name) {
        ProgramLevel level = new ProgramLevel();
        level.setCode(code);
        level.setName(name);
        return repository.save(level);
    }

    public List<ProgramLevel> getAll() {
        return repository.findAll();
    }
}

