package com.demo.bookstore.repository;

import com.demo.bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomUserRepositoryImpl implements CustomUserRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<User.PaymentMethod> findPaymentMethods(String username) {
        MatchOperation matchStage = Aggregation.match(Criteria.where("username").is(username));
        ProjectionOperation projectStage = Aggregation.project("paymentMethods");
        Aggregation aggregation = Aggregation.newAggregation(matchStage, projectStage);
        AggregationResults<User> output = mongoTemplate.aggregate(aggregation, "user", User.class);

        return output.getMappedResults().stream()
                .flatMap(user -> user.getPaymentMethods().stream())
                .toList();
    }
}
