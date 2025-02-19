package com.demo.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String description;
    private int yearOfPublish;
    private String language;
    private List<String> categories;
    private List<String> tags;
    private BigDecimal price;
    private int soldCount;
    private double rating;

    private String content;

    private String createdBy;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
