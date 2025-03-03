package com.demo.bookstore.repository;

import com.demo.bookstore.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    @Query(value = "{ 'username': ?0 }", fields = "{ 'paymentMethods': 1 }")
    List<User> findPaymentMethods(String username);

    @Query(value = "{ 'username': ?0, 'paymentMethods.cardNumber': ?1, 'paymentMethods.cardExpiry': ?2 }", fields = "{ 'paymentMethods.$': 1 }")
    User.PaymentMethod findPaymentMethod(String username, String cardNumber, String cardExpiry);

    @Query("{ 'username': ?0 }")
    @Update("{ '$push': { 'paymentMethods': ?1 } }")
    void updatePaymentMethodByUsername(String username, User.PaymentMethod paymentMethod);
}
