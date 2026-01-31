package com.dseu.admission.service;

@Service
@RequiredArgsConstructor
public class CollegeService {

    private final CollegeRepository repository;

    public College create(College college) {
        return repository.save(college);
    }

    public List<College> getAll() {
        return repository.findAll();
    }
}

