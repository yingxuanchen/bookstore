package com.demo.bookstore.service;

import com.demo.bookstore.dto.LoginRequest;
import com.demo.bookstore.dto.SignupRequest;
import com.demo.bookstore.dto.UserDTO;
import com.demo.bookstore.entity.User;
import com.demo.bookstore.repository.CustomUserRepository;
import com.demo.bookstore.repository.UserRepository;
import com.demo.bookstore.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final CustomUserRepository customUserRepo;

    public UserDTO login(LoginRequest req) {
        User user = userRepo.findByUsername(req.username());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username/password");
        }
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username/password");
        }

        String jwt = jwtUtils.generateJwt(user.getUsername());
        return new UserDTO(user.getUsername(), user.getRoles(), jwt);
    }

    public UserDTO createUser(SignupRequest req) {
        User existingUser = userRepo.findByUsername(req.username());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        if (!req.password().equals(req.confirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        User user = new User();
        user.setUsername(req.username());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setEmail(req.email());
        user.setRoles(req.isSeller() ? List.of("seller") : List.of());
        userRepo.save(user);

        String jwt = jwtUtils.generateJwt(user.getUsername());
        return new UserDTO(user.getUsername(), user.getRoles(), jwt);
    }

    public List<User.PaymentMethod> getPaymentMethods(String username) {
//        return customUserRepo.findPaymentMethods(username);

        return userRepo.findPaymentMethods(username).stream()
                .flatMap(user -> user.getPaymentMethods().stream())
                .toList();
    }
}
