package com.dseu.admission.repository;

import com.dseu.admission.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpRepository ,Long> {
    Optional<OtpVerification> findByEmailAndOtp(String email,String otp);

    void deleteByEmail(String email);
}
