package com.demo.bookstore.service;

import com.demo.bookstore.dto.BookDTO;
import com.demo.bookstore.entity.Book;
import com.demo.bookstore.entity.BookElastic;
import com.demo.bookstore.entity.Rating;
import com.demo.bookstore.repository.BookElasticRepository;
import com.demo.bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepo;
    private final BookElasticRepository bookElasticRepo;

    public Page<Book> findBooks(String searchInput, Pageable pageable) {
//        return bookRepo.findByTitleLikeIgnoreCase(searchInput, pageable);

        if (searchInput.isBlank()) {
            return bookRepo.findAll(pageable);
        } else {
            TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchInput);
            Pageable pageAndSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("score"));
            return bookRepo.findAllBy(criteria, pageAndSort);
        }
    }

    public Page<BookElastic> findBooksElastic(String searchInput, Pageable pageable) {
        return bookElasticRepo.findByTitleContaining(searchInput, pageable);
    }

    public void addBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.title());
        book.setAuthor(bookDTO.author());
        book.setDescription(bookDTO.description());
        book.setYearOfPublish(bookDTO.yearOfPublish());
        book.setBookLanguage(bookDTO.bookLanguage());
        book.setCategories(bookDTO.categories());
        book.setTags(bookDTO.tags());
        book.setPrice(bookDTO.price());
        book.setSoldCount(0);
        book.setRating(new Rating(0, 0));
        book.setContent("Once upon a time, there was a wizard who didn't know he is a wizard.");
        book.setCreatedBy("someone");
        bookRepo.save(book);
    }
}
