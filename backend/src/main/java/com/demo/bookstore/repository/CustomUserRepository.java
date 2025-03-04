package com.demo.bookstore.repository;

import com.demo.bookstore.entity.User;

import java.util.List;

public interface CustomUserRepository {
    List<User.PaymentMethod> findPaymentMethods(String username);
}
