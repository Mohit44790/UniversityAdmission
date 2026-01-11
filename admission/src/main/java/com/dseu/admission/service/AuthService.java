package com.dseu.admission.service;

import com.dseu.admission.dto.RegisterRequest;
import com.dseu.admission.dto.ResetPasswordRequest;
import com.dseu.admission.entity.OtpVerification;
import com.dseu.admission.entity.Role;
import com.dseu.admission.entity.User;
import com.dseu.admission.repository.OtpRepository;
import com.dseu.admission.repository.UserRepository;
import com.dseu.admission.util.OtpGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;   // ✅ FIXED
    private final EmailService emailService;         // ✅ FIXED

    // ===============================
    // REGISTER
    // ===============================
    public void register(RegisterRequest request) {

        // Check email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Check password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        // Create user
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);
        user.setEmailVerified(false);

        userRepository.save(user);

        // Send OTP
        sendOtp(request.getEmail());
    }

    // ===============================
    // SEND OTP
    // ===============================
    public void sendOtp(String email) {

        // Remove previous OTPs
        otpRepository.deleteByEmail(email);

        String otp = OtpGenerator.generate();

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        otpRepository.save(otpEntity);

        emailService.sendOtp(email, otp);
    }

    // ===============================
    // RESET PASSWORD
    // ===============================
    public void resetPassword(ResetPasswordRequest request) {

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        OtpVerification otp = otpRepository
                .findByEmailAndOtp(request.getEmail(), request.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpRepository.deleteByEmail(request.getEmail());
    }
}
