package com.dseu.admission.service;

import com.dseu.admission.dto.OtpVerifyRequest;
import com.dseu.admission.dto.RegisterRequest;
import com.dseu.admission.dto.ResetPasswordRequest;
import com.dseu.admission.entity.OtpVerification;
import com.dseu.admission.entity.Role;
import com.dseu.admission.entity.User;
import com.dseu.admission.repository.OtpRepository;
import com.dseu.admission.repository.UserRepository;
import com.dseu.admission.util.OtpGenerator;
import jakarta.transaction.Transactional;
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
    @Transactional
    public void sendOtp(String email) {

        otpRepository.findByEmail(email).ifPresent(existingOtp -> {

            // Check block
            if (existingOtp.getBlockedUntil() != null &&
                    existingOtp.getBlockedUntil().isAfter(LocalDateTime.now())) {

                throw new RuntimeException(
                        "Too many wrong attempts. Try again after 10 minutes."
                );
            }

            otpRepository.deleteByEmail(email);
        });

        String otp = OtpGenerator.generate();

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(1)); // ⏱ 1 min
        otpEntity.setAttempts(0);
        otpEntity.setBlockedUntil(null);

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

    @Transactional
    public void verifyOtp(OtpVerifyRequest request) {

        OtpVerification otpEntity = otpRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // Check block
        if (otpEntity.getBlockedUntil() != null &&
                otpEntity.getBlockedUntil().isAfter(LocalDateTime.now())) {
            long minutesLeft = java.time.Duration.between(LocalDateTime.now(), otpEntity.getBlockedUntil()).toMinutes();
            throw new RuntimeException("OTP blocked. Try again after " + minutesLeft + " minutes.");
        }

        // Check expiry
        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        // Wrong OTP
        if (!otpEntity.getOtp().equals(request.getOtp())) {

            int attempts = otpEntity.getAttempts() + 1;
            otpEntity.setAttempts(attempts);

            // Block after 3 attempts
            if (attempts >= 3) {
                otpEntity.setBlockedUntil(LocalDateTime.now().plusMinutes(10));
                otpRepository.save(otpEntity);
                throw new RuntimeException("Invalid OTP. You have reached maximum attempts. Try again after 10 minutes.");
            }

            otpRepository.save(otpEntity);
            int attemptsLeft = 3 - attempts;
            throw new RuntimeException("Invalid OTP. You have " + attemptsLeft + " attempt(s) left.");
        }

        // ✅ OTP VERIFIED
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmailVerified(true);
        userRepository.save(user);

        // Remove OTP from DB
        otpRepository.deleteByEmail(request.getEmail());
    }



    @Transactional
    public void resendOtp(String email) {

        OtpVerification otpEntity = otpRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No OTP found. Please register first."));

        // Check if user is blocked
        if (otpEntity.getBlockedUntil() != null &&
                otpEntity.getBlockedUntil().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Too many wrong attempts. Try again after 10 minutes.");
        }

        // Only resend if OTP is expired or about to expire
        if (otpEntity.getExpiryTime().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Current OTP is still valid. Please check your email.");
        }

        // Generate new OTP
        String otp = OtpGenerator.generate();
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(1)); // OTP valid 1 min
        otpEntity.setAttempts(0); // reset attempts
        otpEntity.setBlockedUntil(null); // reset block

        otpRepository.save(otpEntity);

        emailService.sendOtp(email, otp);
    }

}
