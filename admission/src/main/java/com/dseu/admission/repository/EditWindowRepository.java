package com.dseu.admission.repository;



import com.dseu.admission.entity.EditWindow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditWindowRepository
        extends JpaRepository<EditWindow, Long> {

    EditWindow findTopByOrderByIdDesc();
}
