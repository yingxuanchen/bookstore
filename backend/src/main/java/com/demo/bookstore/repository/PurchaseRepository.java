package com.demo.bookstore.repository;

import com.demo.bookstore.entity.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PurchaseRepository extends MongoRepository<Purchase, String> {

    @Query(value = "{ 'username': ?0, 'book.bookId': ?1 }", fields = "{ '_id': 1 }")
    String findByUsernameAndBookId(String username, String bookId);
}
