package com.dseu.admission.service;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository repository;
    private final ProgramLevelRepository levelRepository;

    public Program create(String name, Long levelId) {
        Program program = new Program();
        program.setProgramName(name);
        program.setProgramLevel(
                levelRepository.findById(levelId).orElseThrow()
        );
        return repository.save(program);
    }

    public List<Program> getByLevel(String levelCode) {
        return repository.findByProgramLevel_Code(levelCode);
    }
}
