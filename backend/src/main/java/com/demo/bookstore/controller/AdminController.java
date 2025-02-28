package com.demo.bookstore.controller;

import com.demo.bookstore.dto.CategoryDTO;
import com.demo.bookstore.dto.LanguageDTO;
import com.demo.bookstore.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @GetMapping("categories")
    List<String> getCategories() {
//        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "purpose");
        return adminService.getCategories();
    }

    @PostMapping("categories")
    void addCategory(@RequestBody CategoryDTO categoryDTO) {
        adminService.addCategory(categoryDTO);
    }

    @GetMapping("languages")
    List<String> getLanguages() {
//        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "purpose");
        return adminService.getLanguages();
    }

    @PostMapping("languages")
    void addLanguage(@RequestBody LanguageDTO languageDTO) {
        adminService.addLanguage(languageDTO);
    }
}
