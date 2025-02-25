package com.demo.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document
@Data
public class Book {
    @Id
    private String id;
    @TextIndexed
    private String title;
    @TextIndexed
    private String author;
    @TextIndexed
    private String description;
    private int yearOfPublish;
    private String bookLanguage;
    private List<String> categories;
    @TextIndexed
    private List<String> tags;
    private BigDecimal price;
    private int soldCount;
    private Rating rating;

    private String content;

    private String createdBy;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @TextScore
    private Float score;
}
