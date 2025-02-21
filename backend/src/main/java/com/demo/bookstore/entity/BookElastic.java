package com.demo.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(indexName = "connector-mongodb-bookstore")
@Data
public class BookElastic {
    @Id
    private String id;
    private String title;
    private String author;
    private String description;
    private int yearOfPublish;
    private String bookLanguage;
    private List<String> categories;
    private List<String> tags;
    private BigDecimal price;
    private int soldCount;
    private double rating;

    private String content;

    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
