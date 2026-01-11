package com.dseu.admission.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // ===============================
    // SEND OTP EMAIL
    // ===============================
    public void sendOtp(String toEmail, String otp) {

        String subject = "DSEU Admission Portal - Email Verification OTP";
        String body = """
                Dear Applicant,

                Your One-Time Password (OTP) for email verification is:

                OTP: %s

                This OTP is valid for 10 minutes.
                Please do not share this OTP with anyone.

                Regards,
                DSEU Admission Team
                """.formatted(otp);

        sendEmail(toEmail, subject, body);
    }

    // ===============================
    // GENERIC EMAIL METHOD
    // ===============================
    private void sendEmail(String toEmail, String subject, String body) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body);

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
