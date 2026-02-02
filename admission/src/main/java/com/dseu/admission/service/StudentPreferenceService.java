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
    private final StudentProfileRepository profileRepo;
    private final EditWindowService editWindowService;

    public void savePreferences(String studentId, List<StudentPreference> prefs) {

        StudentProfile profile = profileRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        boolean editAllowed = editWindowService.isEditAllowed();

        if (Boolean.TRUE.equals(profile.getPreferenceLocked()) && !editAllowed) {
            throw new RuntimeException("Preferences are locked");
        }

        repository.deleteByStudentId(studentId);

        for (StudentPreference p : prefs) {
            p.setStudentId(studentId);
            repository.save(p);
        }
    }

    public void lockPreferences(String studentId) {

        StudentProfile profile = profileRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setPreferenceLocked(true);
        profileRepo.save(profile);
    }

    public List<StudentPreference> getAllPreferences() {
        return repository.findAll();
    }
}
