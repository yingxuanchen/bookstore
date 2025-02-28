package com.demo.bookstore.entity;

import lombok.Data;

@Data
public class PaymentMethod {
    private String method;
    private String cardNumber;
    private String cardExpiry;
}
