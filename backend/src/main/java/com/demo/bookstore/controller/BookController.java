package com.demo.bookstore.controller;

import com.demo.bookstore.dto.BookDTO;
import com.demo.bookstore.entity.Book;
import com.demo.bookstore.entity.BookElastic;
import com.demo.bookstore.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("books")
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping
    Page<Book> findBooks(
            @RequestParam(defaultValue = "", name = "src") String searchInput,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return bookService.findBooks(searchInput, pageable);
    }

    @GetMapping("elastic")
    Page<BookElastic> findBooksElastic(
            @RequestParam(defaultValue = "", name = "src") String searchInput,
            @PageableDefault(sort = {"rating", "id"}, direction = Sort.Direction.DESC, size = 10) Pageable pageable
    ) {
        return bookService.findBooksElastic(searchInput, pageable);
    }

    @PostMapping
    void addBook(@RequestBody BookDTO bookDTO) {
        bookService.addBook(bookDTO);
    }
}
