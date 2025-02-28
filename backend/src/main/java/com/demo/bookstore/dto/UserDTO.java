package com.demo.bookstore.dto;

import java.util.List;

public record UserDTO(String username, List<String> roles, String jwt) {
}
