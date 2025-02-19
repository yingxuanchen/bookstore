package com.demo.bookstore.dto;

import java.math.BigDecimal;
import java.util.List;

public record BookDTO(
        String id,
        String title,
        String author,
        String description,
        int yearOfPublish,
        String language,
        List<String> categories,
        List<String> tags,
        BigDecimal price,
        int soldCount,
        double rating,
        String content
) {
}
