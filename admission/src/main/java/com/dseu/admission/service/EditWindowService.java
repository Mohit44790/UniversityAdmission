package com.dseu.admission.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EditWindowService {

    private final EditWindowRepository repository;

    public void open() {
        EditWindow w = new EditWindow();
        w.setActive(true);
        w.setStartTime(LocalDateTime.now());
        repository.save(w);
    }

    public void close() {
        EditWindow w = repository.findTopByOrderByIdDesc();
        w.setActive(false);
        w.setEndTime(LocalDateTime.now());
        repository.save(w);
    }

    public boolean isActive() {
        return repository.findTopByOrderByIdDesc().getActive();
    }
}

