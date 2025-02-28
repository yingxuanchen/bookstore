package com.demo.bookstore.dto;

public record SignupRequest(
        String username,
        String password,
        String confirmPassword,
        String email,
        boolean isSeller
) {
}
