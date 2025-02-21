package com.demo.bookstore.repository;

import com.demo.bookstore.entity.BookElastic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookElasticRepository extends ElasticsearchRepository<BookElastic, String> {
    Page<BookElastic> findByTitleLikeIgnoreCase(String title, Pageable pageable);

    Page<BookElastic> findByTitleContaining(String title, Pageable pageable);

}
