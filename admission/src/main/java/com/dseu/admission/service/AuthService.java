package com.dseu.admission.service;

import com.dseu.admission.dto.RegisterRequest;
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
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;

    public void register(RegisterRequest request){
        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new RuntimeException("Password do not match");
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);
        user.setEmailVerified(false);

        userRepository.save(user);

        String otp = OtpGenerator.generate();

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(request.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        OtpRepository.save(otpEntity);

        emailService.sendOtp(request.getEmail(),otp);
    }
}
