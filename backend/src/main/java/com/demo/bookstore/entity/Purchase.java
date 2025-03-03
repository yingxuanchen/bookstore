package com.demo.bookstore.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document
public class Purchase {
    @Id
    private String id;
    private Payment payment;
    private BigDecimal amount;
    private Book book;
    private String username;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    public static class Payment {
        private String transactionId;
        private String method;
        private String cardNumber;
    }

    @Data
    @AllArgsConstructor
    public static class Book {
        private String bookId;
        private String title;
    }
}
