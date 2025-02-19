package com.demo.bookstore.repository;

import com.demo.bookstore.entity.Language;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LanguageRepository extends MongoRepository<Language, String> {
}
