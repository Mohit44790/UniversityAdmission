package com.dseu.admission.service;

import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.entity.StudentProfile;
import com.dseu.admission.repository.ProgramCollegeRepository;
import com.dseu.admission.repository.StudentPreferenceRepository;
import com.dseu.admission.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentPreferenceService {

    private final StudentPreferenceRepository repository;
    private final ProgramCollegeRepository pcRepo;
    private final StudentProfileRepository profileRepo;

    public void savePreferences(String studentId, List<StudentPreference> prefs) {

        StudentProfile profile = profileRepo.findById(studentId).orElseThrow();

        if (profile.getPreferenceLocked())
            throw new RuntimeException("Preferences locked");

        repository.deleteByStudentId(studentId);

        prefs.forEach(p -> {
            p.setStudentId(studentId);
            repository.save(p);
        });
    }

    public void lock(String studentId) {
        StudentProfile profile = profileRepo.findById(studentId).orElseThrow();
        profile.setPreferenceLocked(true);
        profileRepo.save(profile);
    }
}
