package com.dseu.admission.service;

import com.dseu.admission.entity.ProgramCollege;
import com.dseu.admission.repository.CollegeRepository;
import com.dseu.admission.repository.ProgramCollegeRepository;
import com.dseu.admission.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramCollegeService {

    private final ProgramCollegeRepository repository;
    private final ProgramRepository programRepo;
    private final CollegeRepository collegeRepo;

    public ProgramCollege create(Long programId, Long collegeId, int seats, int minRank) {
        ProgramCollege pc = new ProgramCollege();
        pc.setProgram(programRepo.findById(programId).orElseThrow());
        pc.setCollege(collegeRepo.findById(collegeId).orElseThrow());
        pc.setTotalSeats(seats);
        pc.setAvailableSeats(seats);
        pc.setMinRank(minRank);
        return repository.save(pc);
    }

    public List<ProgramCollege> getByLevel(String level) {
        return repository.findByProgram_ProgramLevel_Code(level);
    }
}
