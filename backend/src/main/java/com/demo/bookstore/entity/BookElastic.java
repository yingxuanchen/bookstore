package com.demo.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "connector-mongodb-bookstore")
@Data
public class BookElastic {
    @Id
    private String id;
    private String title;
    private String author;
}
