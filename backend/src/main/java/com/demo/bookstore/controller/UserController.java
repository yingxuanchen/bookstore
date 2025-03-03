package com.demo.bookstore.controller;

import com.demo.bookstore.dto.LoginRequest;
import com.demo.bookstore.dto.SignupRequest;
import com.demo.bookstore.dto.UserDTO;
import com.demo.bookstore.entity.User;
import com.demo.bookstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("login")
    UserDTO login(@RequestBody LoginRequest req) {
        return userService.login(req);
    }

    @PostMapping("signup")
    UserDTO signup(@RequestBody SignupRequest req) {
        return userService.createUser(req);
    }

    @GetMapping("payment")
    List<User> getPaymentMethods(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return userService.getPaymentMethods(user.getUsername());
    }
}
