package com.demo.bookstore.dto;

import java.math.BigDecimal;

public record PurchaseRequest(
        String bookId,
        BigDecimal price,
        String cardNumber,
        String cardExpiry,
        String cvv,
        boolean toSaveCard
) {
}
