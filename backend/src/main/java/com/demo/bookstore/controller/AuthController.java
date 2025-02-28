package com.demo.bookstore.controller;

import com.demo.bookstore.dto.LoginRequest;
import com.demo.bookstore.dto.SignupRequest;
import com.demo.bookstore.dto.UserDTO;
import com.demo.bookstore.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("login")
    UserDTO login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("signup")
    UserDTO signup(@RequestBody SignupRequest req) {
        return authService.createUser(req);
    }
}
