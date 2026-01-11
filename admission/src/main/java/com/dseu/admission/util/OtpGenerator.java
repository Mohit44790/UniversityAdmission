package com.dseu.admission.util;

import java.security.SecureRandom;

public class OtpGenerator {

    private static final SecureRandom random = new SecureRandom();

    private OtpGenerator() {
        // prevent object creation
    }

    // ===============================
    // GENERATE 6-DIGIT OTP
    // ===============================
    public static String generate() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
