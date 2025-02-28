package com.demo.bookstore.service;

import com.demo.bookstore.dto.CategoryDTO;
import com.demo.bookstore.dto.LanguageDTO;
import com.demo.bookstore.entity.Category;
import com.demo.bookstore.entity.Language;
import com.demo.bookstore.repository.CategoryRepository;
import com.demo.bookstore.repository.LanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final CategoryRepository categoryRepo;
    private final LanguageRepository languageRepo;

    public List<String> getCategories() {
        return categoryRepo.findAll().stream().map(Category::getName).toList();
    }

    public List<String> getLanguages() {
        return languageRepo.findAll().stream().map(Language::getName).toList();
    }

    public void addCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.name());
        categoryRepo.save(category);
    }

    public void addLanguage(LanguageDTO languageDTO) {
        Language language = new Language();
        language.setName(languageDTO.name());
        languageRepo.save(language);
    }
}
