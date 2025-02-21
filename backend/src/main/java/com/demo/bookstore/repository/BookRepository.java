package com.demo.bookstore.repository;

import com.demo.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
    Page<Book> findByTitleLikeIgnoreCase(String title, Pageable pageable);

    Page<Book> findAllBy(TextCriteria criteria, Pageable pageable);
}
