package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select r from Review r where r.id = ?1")
    public List<Review> getAllProductReviews(Long pid);

}
