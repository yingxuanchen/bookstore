package com.demo.bookstore.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class RandomUtil {
    private static SecureRandom rnd = new SecureRandom();

    private static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String lower = upper.toLowerCase();
    private static final String digits = "0123456789";
    private static final String alphanumeric = upper + lower + digits;

    public static String randomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(alphanumeric.charAt(rnd.nextInt(0, alphanumeric.length())));
        }
        return sb.toString();
    }
}
