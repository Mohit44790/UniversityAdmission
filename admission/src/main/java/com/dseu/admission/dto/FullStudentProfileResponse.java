package com.dseu.admission.dto;

import com.dseu.admission.entity.StudentEducation;
import com.dseu.admission.entity.StudentPreference;
import com.dseu.admission.entity.StudentProfile;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FullStudentProfileResponse {

    private StudentProfile profile;

    private StudentEducation education;

    private List<StudentPreference> preferences;

    private String selectedProgramLevel;

    private Boolean profileLocked;
}
